/**
 * @fileoverview A set of components for building vertically collapsing accordions.
 *
 * This file exports accessible and customizable accordion components based on
 * Radix UI's Accordion primitive. It's pre-styled with Tailwind CSS according
 * to the ShadCN UI design system.
 *
 * @see https://ui.shadcn.com/docs/components/accordion
 * @see https://www.radix-ui.com/primitives/docs/components/accordion
 */

"use client"

// Import React and Radix UI's Accordion primitives.
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// Import the ChevronDown icon for the trigger.
import { ChevronDown } from "lucide-react"

// Import the `cn` utility for merging Tailwind CSS classes.
import { cn } from "@/lib/utils"

/**
 * The root container for the accordion.
 * It should wrap one or more `AccordionItem` components.
 */
const Accordion = AccordionPrimitive.Root

/**
 * A wrapper for an individual item within the accordion.
 * Each item consists of a trigger and content.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * The button that toggles the open/closed state of an `AccordionItem`.
 * It automatically handles the ARIA attributes for accessibility.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * The collapsible content panel for an `AccordionItem`.
 * It is displayed when the item is open.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Export the components for use in the application.
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
