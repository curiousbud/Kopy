/**
 * @fileoverview A basic, styled input component.
 *
 * This component provides a consistent style for text-based input fields
 * across the application, including focus states and disabled states.
 *
 * @see https://ui.shadcn.com/docs/components/input
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The Input component. It's a `forwardRef` component, which allows it to
 * receive a ref and pass it down to the underlying `<input>` element. This
 * is important for form libraries and for focusing the element programmatically.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
