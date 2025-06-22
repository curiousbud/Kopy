/**
 * @fileoverview A tooltip component for displaying information on hover.
 *
 * This provides a small pop-up label that appears when a user hovers over an element.
 * It's built on Radix UI's Tooltip primitive for accessibility.
 *
 * @see https://ui.shadcn.com/docs/components/tooltip
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip
 */

"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/** The provider that manages the tooltip state. Should wrap the part of the app that uses tooltips. */
const TooltipProvider = TooltipPrimitive.Provider

/** The root component for a tooltip. */
const Tooltip = TooltipPrimitive.Root

/** The trigger element that shows the tooltip on hover. */
const TooltipTrigger = TooltipPrimitive.Trigger

/** The content container for the tooltip that appears on hover. */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
