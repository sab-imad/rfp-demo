"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Placeholder for backend logic
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "This is a placeholder response.", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle>Chat with your data</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
