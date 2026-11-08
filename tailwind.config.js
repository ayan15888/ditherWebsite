/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF8F5",
          100: "#FFF0EB",
          200: "#FFE0D6",
          500: "#FF6B35",
          600: "#F2541B",
          700: "#D43C07",
        },
        cute: {
          peach: "#FFF4EE",
          mint: "#EDFAF4",
          lavender: "#F6F2FF",
          honey: "#FFFBEB",
          sky: "#F0F9FF",
          rose: "#FFF1F2",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cute': '0 10px 30px -10px rgba(255, 107, 53, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'cute-card': '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'cute-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.07), 0 8px 16px -4px rgba(0, 0, 0, 0.03)',
        'pill': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '2.75rem',
      },
    },
  },
  plugins: [],
};
