/**
 * @fileoverview A component that provides a UI for toggling the application's theme.
 *
 * This component uses a dropdown menu to allow the user to switch between
 * "Light", "Dark", and "System" themes. It utilizes the `useTheme` hook
 * from the `next-themes` library to get and set the current theme.
 */

"use client"

// Import React and hooks/components from `next-themes` and ShadCN.
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * The ThemeToggle component.
 * @returns {JSX.Element} A dropdown button for changing the theme.
 */
export function ThemeToggle() {
  // The `useTheme` hook provides the `setTheme` function to change the theme.
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* The button displays a Sun icon for light mode and a Moon icon for dark mode. */}
        <Button variant="ghost" size="icon">
          {/* Sun icon: Visible in light mode, hidden in dark mode. */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon: Hidden in light mode, visible in dark mode. */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Screen reader text for accessibility. */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Dropdown items to set the theme to a specific value. */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
