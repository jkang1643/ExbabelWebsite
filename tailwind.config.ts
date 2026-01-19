import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sora)', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'hero-light': 'oklch(0.801 0.056 280.3)',
        aurora: {
          pink: 'var(--color-aurora-pink)',
          purple: 'var(--color-aurora-purple)',
          yellow: 'var(--color-aurora-yellow)',
          mint: 'var(--color-aurora-mint)',
        },
        base: {
          white: 'var(--color-base-white)',
          paper: 'var(--color-base-paper)',
          ink: 'var(--color-base-ink)',
          muted: 'var(--color-base-muted)',
        }
      },
      borderRadius: {
        'card-xl': 'var(--radius-card-xl)',
        'control-md': 'var(--radius-control-md)',
        'button-pill': 'var(--radius-button-pill)',
        // Aurora radii
        'aurora-sm': 'var(--radius-sm)',
        'aurora-md': 'var(--radius-md)',
        'aurora-lg': 'var(--radius-lg)',
        'aurora-xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'ebb-deep': 'var(--shadow-deep)',
        'cta-hover': 'var(--shadow-cta-hover)',
        // Aurora Shadows
        'aurora-ambient': 'var(--shadow-aurora-ambient)',
        'aurora-card': 'var(--shadow-aurora-card)',
        'aurora-hover': 'var(--shadow-aurora-hover)',
        'aurora-active': 'var(--shadow-aurora-active)',
        'aurora-focused': '0 0 0 6px var(--focus-ring-color-cool)',
        'aurora-focused-warm': '0 0 0 6px var(--focus-ring-color-warm)',
      },
      spacing: {
        'ebb-xs': 'var(--spacing-xs)',
        'ebb-sm': 'var(--spacing-sm)',
        'ebb-md': 'var(--spacing-md)',
        'ebb-lg': 'var(--spacing-lg)',
        'ebb-xl': 'var(--spacing-xl)',
      },
      blur: {
        'aurora-xs': 'var(--blur-aurora-xs)',
        'aurora-sm': 'var(--blur-aurora-sm)',
        'aurora-md': 'var(--blur-aurora-md)',
        'aurora-lg': 'var(--blur-aurora-lg)',
        'aurora-xl': 'var(--blur-aurora-xl)',
        'aurora-hero': 'var(--blur-aurora-hero)',
        'aurora-ambient': 'var(--blur-aurora-ambient)',
      },
      opacity: {
        'aurora-ambient': 'var(--opacity-aurora-ambient)',
        'aurora-subtle': 'var(--opacity-aurora-subtle)',
        'aurora-hover': 'var(--opacity-aurora-hover)',
      },
      borderColor: {
        'aurora-subtle': 'var(--border-color-subtle)',
        'aurora-default': 'var(--border-color-default)',
        'aurora-hover': 'var(--border-color-hover)',
      },
      transitionTimingFunction: {
        'aurora-standard': 'var(--ease-standard)',
        'aurora-out': 'var(--ease-out)',
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: false, // Disable built-in themes, use CSS-based theme only
    styled: true,
    base: true,
    utils: true,
    logs: false,
  },
};
export default config;

