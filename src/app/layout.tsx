/**
 * @fileoverview This is the root layout for the entire application.
 *
 * It wraps all pages with common components like the header, theme provider,
 * and authentication provider. Any HTML structure or providers defined here
 * will be present on every page of the app.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required
 */

import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { MainHeader } from "@/components/main-header";
import "./globals.css";

/**
 * Metadata for the application.
 * This object is used by Next.js to set the <title> and <meta> tags in the document's <head>.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  title: "Kopy - Your Second Brain",
  description: "A minimalist markdown note-taking app.",
};

/**
 * The RootLayout component.
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 *                                          In Next.js, this will be the active page.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The `suppressHydrationWarning` attribute is used here because next-themes
    // can cause a mismatch between the server-rendered and client-rendered HTML
    // when detecting the system theme. This attribute tells React to ignore it.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for better performance. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Import the fonts used in the application. */}
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      {/* Set the default font and enable anti-aliasing for smoother text. */}
      <body className="font-body antialiased">
        {/*
          The Providers component wraps all client-side context providers.
          This is a critical pattern in the Next.js App Router to separate
          server and client concerns. The RootLayout remains a Server Component.
        */}
        <Providers>
            {/* The main header component, which is displayed on all pages. */}
            <MainHeader />
            {/* The `children` prop renders the active page component. */}
            <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
