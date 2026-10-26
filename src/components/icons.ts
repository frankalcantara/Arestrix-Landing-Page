/**
 * Inline icon set for the Arestrix landing page on a 24×24 grid (stroke icons, 1.5px).
 * No icon font and no third-party icon license: add your own by appending markup here.
 */
export const ICONS = {
  "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  github:
    '<path d="M9 19c-4 1.3-4-2-5.6-2.5M14.6 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.6-.3 5.4-1.3 5.4-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.3 3.3 5.3 3.6 5.3 3.6a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4 9.8c0 4.5 2.7 5.5 5.4 5.8a2.8 2.8 0 0 0-.8 2.2V21"/>',
  "x-social":
    '<path fill="currentColor" stroke="none" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.9 2h6.4l4.4 5.9L18.9 2Zm-1.1 18.1h1.7L8.1 3.8H6.3l11.5 16.3Z"/>',
} as const;

export type IconName = keyof typeof ICONS;
