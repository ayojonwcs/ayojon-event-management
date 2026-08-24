import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes cleanly
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}