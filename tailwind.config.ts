/**
 * @fileoverview This is the configuration file for Tailwind CSS.
 *
 * It allows you to customize the design system of your application, including colors,
 * fonts, spacing, and more. This configuration is set up for use with ShadCN UI,
 * which uses CSS variables for theming.
 *
 * @see https://tailwindcss.com/docs/configuration
 * @see https://ui.shadcn.com/docs/theming
 */

import type {Config} from 'tailwindcss';

export default {
  // Configures dark mode to be toggled by a 'dark' class on the <html> element.
  darkMode: ['class'],
  // Specifies the files that Tailwind should scan for class names.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Custom container settings for consistent content width and padding.
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Defines custom font families for the application.
      fontFamily: {
        body: ['"JetBrains Mono"', 'monospace'],
        headline: ['"Fira Code"', 'monospace'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      // Defines the color palette using CSS variables for theming.
      // These variables are defined in `src/app/globals.css`.
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      // Custom border radius values, mapped to a CSS variable for consistency.
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom keyframe animations for components like Accordion.
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Adds the `tailwindcss-animate` plugin for keyframe animations.
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
