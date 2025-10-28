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
        federal: 'var(--color-federal)',
        indigo: 'var(--color-indigo)',
        ultraviolet: 'var(--color-ultraviolet)',
        azure: 'var(--color-azure)',
        davy: 'var(--color-davy)',
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        exbabel: {
          // Primary brand color - vibrant blue for buttons, CTAs, and primary actions
          "primary": "oklch(0.608 0.370 264.7)",
          "primary-content": "oklch(98% 0.003 247.858)", // White text on primary
          
          // Secondary brand color - lighter blue for secondary elements
          "secondary": "oklch(0.740 0.077 244.7)",
          "secondary-content": "oklch(98% 0.003 247.858)", // White text on secondary
          
          // Accent color - neutral blue-gray for borders and accents
          "accent": "#5a5d80",
          "accent-content": "oklch(100% 0 0)", // White text on accent
          
          // Neutral - used for neutral UI elements
          "neutral": "#5a5d80",
          "neutral-content": "oklch(100% 0 0)", // White text on neutral
          
          // Base colors - backgrounds
          "base-100": "oklch(100% 0 0)", // White background
          "base-200": "oklch(97% 0 0)", // Light gray background
          "base-300": "oklch(92% 0 0)", // Medium gray background
          "base-content": "oklch(0.474 0.050 238.1)", // Body text color - blue-gray
          
          // Semantic colors
          "info": "oklch(74% 0.16 232.661)",
          "info-content": "oklch(98% 0.003 247.858)",
          "success": "oklch(76% 0.177 163.223)",
          "success-content": "oklch(26% 0.007 34.298)",
          "warning": "oklch(82% 0.189 84.429)",
          "warning-content": "oklch(26% 0.007 34.298)",
          "error": "oklch(70% 0.191 22.216)",
          "error-content": "oklch(98% 0.003 247.858)",
        },
      },
    ],
  },
};
export default config;

