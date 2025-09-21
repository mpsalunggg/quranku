
import { twMerge } from 'tailwind-merge';

/**
 * Helper untuk menggabungkan class Tailwind + override
 * @param classes - daftar class string (bisa null/undefined)
 * @returns merged class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}
