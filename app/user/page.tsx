import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Section</CardTitle>
        <CardDescription>
          This is a placeholder for the user section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>User-specific content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
