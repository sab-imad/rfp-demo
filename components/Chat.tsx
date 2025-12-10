"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { askQuestion } from "@/lib/actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (prompt: string) => {
    if (prompt.trim() === "") return;

    const newMessages = [...messages, { role: "user", answer: prompt }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const response = await askQuestion(prompt);
    setIsLoading(false);

    if (response.error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          answer: "Something went wrong. Please try again.",
          error: true,
          prompt,
        },
      ]);
    } else {
      setMessages([...newMessages, ...response[0].output.messages]);
    }
  };

  const renderVisualization = (visualization: any) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    switch (visualization.chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visualization.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={visualization.xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={visualization.dataKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visualization.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={visualization.xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={visualization.dataKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visualization.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={visualization.dataKey}
              >
                {visualization.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col h-[80vh]">
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.answer }} />
                {message.visualization && renderVisualization(message.visualization)}
                {message.error && (
                  <Button
                    onClick={() => handleSend(message.prompt)}
                    className="mt-2"
                    disabled={isLoading}
                  >
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-2 rounded-lg bg-muted">
                <p>Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            disabled={isLoading}
          />
          <Button onClick={() => handleSend(input)} disabled={isLoading}>
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
