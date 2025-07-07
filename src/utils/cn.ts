import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This utility function combines clsx and twMerge to handle conditional class names
// It allows you to pass multiple class names and merges them, removing duplicates
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
