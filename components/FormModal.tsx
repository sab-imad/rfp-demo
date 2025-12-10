"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function FormModal({ form, children }: { form: any; children: React.ReactNode }) {
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
            />
          </div>
        );
      case "radio":
        return (
          <div key={field.id} className="grid gap-2">
            <Label>{field.label}</Label>
            <RadioGroup>
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
            <Select>
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{form.title}</DialogTitle>
          <DialogDescription>{form.description}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          {form.schema.fields.map(renderField)}
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
