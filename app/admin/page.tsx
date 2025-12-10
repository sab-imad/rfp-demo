import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/admin/forms">
        <Card>
          <CardHeader>
            <CardTitle>Forms</CardTitle>
            <CardDescription>
              Generate and manage forms.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/admin/analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              View and analyze form data.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
