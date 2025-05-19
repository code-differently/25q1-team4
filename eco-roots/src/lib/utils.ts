
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names or class name objects using clsx and tailwind-merge
 * This allows for conditional class names and proper merging of Tailwind CSS classes
 * 
 * @param inputs - Class names or class name objects to combine
 * @returns Combined and merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}