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
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'hero-light': 'oklch(0.801 0.056 280.3)', // #b6bae2 - Light lavender-blue for hero gradient
      },
      borderRadius: {
        'card-xl': 'var(--radius-card-xl)',
        'control-md': 'var(--radius-control-md)',
        'button-pill': 'var(--radius-button-pill)',
      },
      boxShadow: {
        'ebb-deep': 'var(--shadow-deep)',
        'cta-hover': 'var(--shadow-cta-hover)',
      },
      spacing: {
        'ebb-xs': 'var(--spacing-xs)',
        'ebb-sm': 'var(--spacing-sm)',
        'ebb-md': 'var(--spacing-md)',
        'ebb-lg': 'var(--spacing-lg)',
        'ebb-xl': 'var(--spacing-xl)',
      },
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

