"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getForms } from "@/lib/actions";
import { UserFormModal } from "@/components/UserFormModal";

export default function UserPage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const allForms = await getForms();
      if (allForms && !allForms.error) {
        setForms(allForms);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms.map((form: any) => (
        <Card key={form.id} className="flex flex-col justify-between h-56">
          <CardHeader className="flex-grow">
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <UserFormModal form={form}>
              <Button>Fill Form</Button>
            </UserFormModal>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
