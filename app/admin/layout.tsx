import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li>
              <Link href="/admin/forms" className="text-white hover:text-gray-300">
                Forms
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}