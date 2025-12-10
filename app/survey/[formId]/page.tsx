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
import { getResponses, getFormById } from "@/lib/actions";
import { FormModal } from "@/components/FormModal";

export default function SurveyResponsesPage({
  params,
}: {
  params: { formId: string };
}) {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const allResponses = await getResponses(params.formId);
      if (allResponses && !allResponses.error) {
        setResponses(allResponses);
      }
    };
    const fetchForm = async () => {
      const formData = await getFormById(params.formId);
      if (formData && !formData.error) {
        setForm(formData);
      }
    };
    fetchResponses();
    fetchForm();
  }, [params.formId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {responses.map((response: any) => (
        <Card key={response.id}>
          <CardHeader>
            <CardTitle>Response {response.id}</CardTitle>
          </CardHeader>
          <CardFooter>
            {form && (
              <FormModal form={form} responseId={response.id}>
                <Button>View Response</Button>
              </FormModal>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
