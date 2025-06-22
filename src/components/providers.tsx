'use client';

/**
 * @fileoverview Client-side provider wrapper for the application.
 *
 * This component is essential in the Next.js App Router to wrap all client-side
 * context providers. By marking this single component with "use client", we can
 * keep our root layout as a Server Component, which is better for performance.
 * It includes providers for theming (next-themes) and authentication (next-auth).
 */

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
