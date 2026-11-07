/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dither: {
          dark: "#0B0F19",
          card: "#121827",
          border: "#1F293D",
          accent: "#3B82F6",
          orange: "#FF5A1F",
          purple: "#7B2FF7",
          teal: "#16A37F",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

