/**
 * @fileoverview A utility file containing helper functions.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to merge Tailwind CSS classes with conditional class names.
 *
 * It combines the functionality of `clsx` (for conditional classes) and `tailwind-merge`
 * (for resolving conflicting Tailwind classes). This is the standard utility function
 * provided by ShadCN UI.
 *
 * @param {...ClassValue[]} inputs - A list of class names or conditional class objects.
 * @returns {string} The final, merged class name string.
 *
 * @example
 * // cn('p-4', 'font-bold', true && 'text-red-500')
 * // => "p-4 font-bold text-red-500"
 *
 * @example
 * // cn('p-4', 'p-2')
 * // => "p-2" (tailwind-merge resolves the conflict)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
