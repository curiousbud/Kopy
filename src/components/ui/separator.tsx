/**
 * @fileoverview A separator component to visually divide content.
 *
 * This component renders a horizontal or vertical line to separate content,
 * for example, in a list or a toolbar. It's built on Radix UI's Separator
 * primitive.
 *
 * @see https://ui.shadcn.com/docs/components/separator
 * @see https://www.radix-ui.com/primitives/docs/components/separator
 */

"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * The Separator component.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        // Apply different styles based on the orientation.
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
