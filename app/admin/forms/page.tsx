"use client";
import { useState } from "react";
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

export default function FormsPage() {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    // Server action to be implemented
  };

  return (
    <Tabs defaultValue="generate">
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
        <Card>
          <CardHeader>
            <CardTitle>All Forms</CardTitle>
            <CardDescription>
              Here are all the forms you have generated.
            </cardDescription>
          </CardHeader>
          <CardContent>
            {/* List of forms will be rendered here */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}