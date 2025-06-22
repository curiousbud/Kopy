/**
 * @fileoverview An avatar component to display user profile pictures or fallbacks.
 *
 * This file provides `Avatar`, `AvatarImage`, and `AvatarFallback` components.
 * It gracefully handles showing a fallback (e.g., user's initials) if the
 * image fails to load or is not provided. It's built on Radix UI's Avatar primitive.
 *
 * @see https://ui.shadcn.com/docs/components/avatar
 * @see https://www.radix-ui.com/primitives/docs/components/avatar
 */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * The root container for an avatar.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * The image to be displayed in the avatar.
 * This will be hidden automatically if the image fails to load.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * A fallback that is displayed if the `AvatarImage` is not provided
 * or fails to load. Typically used for displaying initials.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Export the components.
export { Avatar, AvatarImage, AvatarFallback }
