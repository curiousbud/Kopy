/**
 * @fileoverview The main header component for the application.
 *
 * This component renders the primary navigation bar that appears at the top
 * of every page. It includes the application logo, navigation links,
 * the theme toggle, and the user navigation menu.
 */

"use client";

// Import Link for client-side navigation and usePathname to detect the active route.
import Link from "next/link";
import { usePathname } from "next/navigation";
// Import the UserNav and ThemeToggle components.
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
// Import UI components.
import { Button } from "@/components/ui/button";
// Import icons.
import { LayoutDashboard, Notebook } from "lucide-react";
// Import utility function for class names.
import { cn } from "@/lib/utils";

/**
 * A simple SVG component for the Kopy application logo.
 * @returns {JSX.Element} The rendered SVG logo.
 */
const KopyLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor" />
  </svg>
);

/**
 * The MainHeader component.
 * @returns {JSX.Element} The rendered header.
 */
export function MainHeader() {
  // The usePathname hook from Next.js gets the current URL path.
  const pathname = usePathname();

  // An array defining the main navigation links.
  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/notes", label: "Notes", icon: Notebook },
  ];

  return (
    // The header is sticky to keep it visible while scrolling.
    // `backdrop-blur-sm` adds a subtle blur effect to the background behind the header.
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        {/* Logo and application name, linking to the homepage. */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <KopyLogo />
            <span className="font-bold font-headline">Kopy</span>
          </Link>
        </div>
        {/* Main navigation links. */}
        <nav className="flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            // Determine if the current link is active to apply special styling.
            // The check is slightly different for the root path ('/') vs. other paths.
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
        {/* Right-aligned section with theme toggle and user menu. */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
