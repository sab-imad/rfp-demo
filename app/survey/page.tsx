"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getForms } from "@/lib/actions";
import Link from "next/link";

export default function SurveyPage() {
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
        <Card key={form.id}>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/survey/${form.id}`}>
              <Button>View Responses</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
