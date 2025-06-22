/**
 * @fileoverview A progress bar component to indicate the completion of a task.
 *
 * This component displays a visual indicator of progress. It's built on top of
 * Radix UI's Progress primitive.
 *
 * @see https://ui.shadcn.com/docs/components/progress
 * @see https://www.radix-ui.com/primitives/docs/components/progress
 */

"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * The Progress component.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    {/* The indicator shows the current progress. Its width is controlled via a CSS transform. */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
