"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getForms } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
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

  const data = [
    {
      name: 'Forms',
      count: forms.length,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Forms Created</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
