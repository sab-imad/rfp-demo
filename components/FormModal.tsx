"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { getResponseById, deleteResponse, submitForm } from "@/lib/actions";

export function FormModal({
  form,
  responseId,
  children,
}: {
  form: any;
  responseId?: string;
  children: React.ReactNode;
}) {
  const [response, setResponse] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (responseId) {
      const fetchResponse = async () => {
        const responseData = await getResponseById(responseId);
        if (responseData && !responseData.error) {
          setResponse(responseData);
        }
      };
      fetchResponse();
    }
  }, [responseId]);

  const handleDelete = async () => {
    if (responseId) {
      await deleteResponse(form.id, responseId);
      setIsOpen(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      form_id: form.id,
      ...Object.fromEntries(formData.entries()),
    };
    const result = await submitForm(payload);
    if (result && !result.error) {
      setIsOpen(false);
    }
  };

  const renderField = (field: any) => {
    const value = response?.find((r: any) => r.field_id === field.id)?.value[
      field.id
    ];

    switch (field.field_type) {
      case "text":
      case "date":
      case "number":
        return (
          <div key={field.id} className="grid gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              name={field.id}
              type={field.field_type}
              placeholder={field.placeholder}
              required={field.required}
              defaultValue={value}
              readOnly={!!responseId}
            />
          </div>
        );
      case "radio":
        return (
          <div key={field.id} className="grid gap-2">
            <Label>{field.label}</Label>
            <RadioGroup name={field.id} defaultValue={value} disabled={!!responseId}>
              {field.options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                  <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "select":
        return (
          <div key={field.id} className="grid gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select name={field.id} defaultValue={value} disabled={!!responseId}>
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  const formId = `form-${form.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{form.title}</DialogTitle>
          <DialogDescription>{form.description}</DialogDescription>
        </DialogHeader>

        <form id={formId} onSubmit={handleSubmit} className="flex-grow overflow-y-auto py-4 pr-6">
          <div className="grid gap-4">{form.schema.fields.map(renderField)}</div>
        </form>

        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {responseId && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {!responseId && (
            <Button type="submit" form={formId}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
