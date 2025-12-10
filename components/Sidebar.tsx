"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  {
    name: "Forms",
    href: "/admin/forms",
  },
  {
    name: "Survey Result",
    href: "/admin/survey-result",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">Symphonize</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  {
                    "bg-muted text-primary": pathname === link.href,
                  }
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
