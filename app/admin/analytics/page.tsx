"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { Chat } from "@/components/Chat";

export default function AnalyticsPage() {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      <TabsContent value="chat">
        <Chat />
      </TabsContent>
    </Tabs>
  );
}
