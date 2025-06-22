"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Notebook } from "lucide-react";
import { cn } from "@/lib/utils";

const KopyLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor" />
  </svg>
);

export function MainHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/notes", label: "Notes", icon: Notebook },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <KopyLogo />
            <span className="font-bold font-headline">Kopy</span>
          </Link>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            const isActive = (pathname === '/' && link.href === '/') || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Button asChild key={link.href} variant={isActive ? "secondary" : "ghost"} size="sm">
                  <Link href={link.href}>
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                  </Link>
              </Button>
            );
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
