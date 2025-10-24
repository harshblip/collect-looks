import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortcuts = [
  {
    "modifier": "ctrl",
    "key": ".",
    "action": "Go to Home"
  },
  {
    "modifier": "ctrl",
    "key": "^",
    "action": "Create a folder"
  },
  {
    "modifier": "ctrl",
    "key": "i",
    "action": "Upload a file"
  },
  {
    "modifier": "ctrl",
    "key": ";",
    "action": "See recently opened"
  },
  {
    "modifier": "ctrl",
    "key": "*",
    "action": "Go to starred files"
  },
  {
    "modifier": "ctrl",
    "key": "!",
    "action": "Visit trash"
  }
]