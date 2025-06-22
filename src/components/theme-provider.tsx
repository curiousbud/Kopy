/**
 * @fileoverview A client component wrapper for the `next-themes` ThemeProvider.
 *
 * This component is necessary because the `next-themes` library uses React Context
 * and client-side logic (like accessing `localStorage`) which requires it to be
 * a Client Component (marked with "use client").
 *
 * This wrapper simplifies the process of applying the theme provider in the root layout.
 *
 * @see https://github.com/pacocoursey/next-themes
 */

"use client"

// Import React and the necessary components from the `next-themes` library.
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

/**
 * A wrapper around the `NextThemesProvider` to be used in the root layout.
 * It passes all its props directly to the underlying provider.
 *
 * @param {ThemeProviderProps} props - The props to pass to the `NextThemesProvider`.
 * @returns {JSX.Element} The rendered `NextThemesProvider` with its children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
