/**
 * @fileoverview A skeleton component for indicating loading states.
 *
 * This component displays a placeholder preview of the content before the data
 * has loaded, improving the user experience by reducing perceived loading time.
 *
 * @see https://ui.shadcn.com/docs/components/skeleton
 */

import { cn } from "@/lib/utils"

/**
 * The Skeleton component.
 * It renders a simple div with a pulsing animation to indicate a loading state.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered skeleton placeholder.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
