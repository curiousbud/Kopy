/**
 * @fileoverview A badge component for displaying short, important information.
 *
 * This component is often used for tags, statuses, or counts. It includes
 * several visual variants (`default`, `secondary`, `destructive`, `outline`).
 *
 * @see https://ui.shadcn.com/docs/components/badge
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Defines the variants for the badge component using `cva`.
 * This allows for different styles to be applied via the `variant` prop.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Defines the props for the Badge component, extending standard div attributes
 * and the variants defined above.
 * @interface
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * The Badge component.
 * @param {BadgeProps} props - The props for the component.
 * @returns {JSX.Element} The rendered badge.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export the component and its variants.
export { Badge, badgeVariants }
