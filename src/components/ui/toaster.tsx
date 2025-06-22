/**
 * @fileoverview A component that renders all active toast notifications.
 *
 * This component uses the `useToast` hook to get the list of active toasts
 * and renders them in the `ToastViewport`. It should be placed in the root
 * layout of the application.
 *
 * @see https://ui.shadcn.com/docs/components/toast
 */

"use client"

// Import the custom `useToast` hook.
import { useToast } from "@/hooks/use-toast"
// Import the necessary toast components.
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

/**
 * The Toaster component. It subscribes to the toast state and renders
 * all toasts.
 * @returns {JSX.Element} The rendered toast provider and viewport.
 */
export function Toaster() {
  // Get the list of toasts from the global toast state.
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {/* Map over the array of toasts and render a `Toast` component for each one. */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      {/* The viewport is the fixed area where all toasts will appear. */}
      <ToastViewport />
    </ToastProvider>
  )
}
