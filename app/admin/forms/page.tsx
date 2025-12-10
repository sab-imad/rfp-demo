"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  generateForm,
  getForms,
  deleteForm,
  getResponses,
} from "@/lib/actions";
import { FormModal } from "@/components/FormModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FormsPage() {
  const [prompt, setPrompt] = useState("");
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [responses, setResponses] = useState([]);
  const [activeTab, setActiveTab] = useState("generate");

  const handleGenerate = async () => {
    const newForms = await generateForm(prompt);
    if (newForms && !newForms.error) {
      setForms([ ...forms, ...newForms]);
      setActiveTab("all-forms");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteForm(id);
    setForms(forms.filter((form: any) => form.id !== id));
  };

  const handleViewResponses = async (form: any) => {
    setSelectedForm(form);
    const formResponses = await getResponses(form.id);
    console.log("formResponses", formResponses);
    if (formResponses && !formResponses.error) {
      setResponses(formResponses);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      const allForms = await getForms();
      if (allForms && !allForms.error) {
        setForms(allForms);
      }
    };
    fetchForms();
  }, []);

  if (selectedForm) {
    return (
      <div>
        <Button onClick={() => setSelectedForm(null)}>Back to Forms</Button>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {responses.map((response: any) => (
            <Card key={response.id}>
              <CardHeader>
                <CardTitle>Response {response.id}</CardTitle>
              </CardHeader>
              <CardFooter>
                <FormModal form={selectedForm} responseId={response.id}>
                  <Button>View Response</Button>
                </FormModal>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="generate">Generate</TabsTrigger>
        <TabsTrigger value="all-forms">All Forms</TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <Card>
          <CardHeader>
            <CardTitle>Generate Form</CardTitle>
            <CardDescription>
              Enter a prompt to generate a new form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a user registration form"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate}>Generate</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="all-forms">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form: any) => (
            <Card key={form.id} className="flex flex-col justify-between h-56">
              <CardHeader className="flex-grow">
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <FormModal form={form}>
                  <Button>View Form</Button>
                </FormModal>
                <Button onClick={() => handleViewResponses(form)}>
                  View Responses
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this form?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(form.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
