"use client";

import { useState } from "react";
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
import { submitForm } from "@/lib/actions";

export function UserFormModal({ form, children }: { form: any; children: React.ReactNode }) {
  const [answers, setAnswers] = useState<any>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setAnswers({ ...answers, [fieldId]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      form_id: form.id,
      user_id: crypto.randomUUID(),
      answers: Object.entries(answers).map(([field_id, value]) => ({
        field_id,
        value,
      })),
    };
    await submitForm(payload);
  };

  const renderField = (field: any) => {
    switch (field.field_type) {
      case "text":
      case "date":
      case "number":
        return (
          <div key={field.id} className="grid gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.field_type}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          </div>
        );
      case "radio":
        return (
          <div key={field.id} className="grid gap-2">
            <Label>{field.label}</Label>
            <RadioGroup onValueChange={(value) => handleInputChange(field.id, value)}>
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
            <Select onValueChange={(value) => handleInputChange(field.id, value)}>
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{form.title}</DialogTitle>
          <DialogDescription>{form.description}</DialogDescription>
        </DialogHeader>
        
        <form id={formId} onSubmit={handleSubmit} className="flex-grow overflow-y-auto py-4 pr-6">
          <div className="grid gap-4">
            {form.schema.fields.map(renderField)}
          </div>
        </form>

        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
