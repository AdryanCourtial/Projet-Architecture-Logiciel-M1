/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e63946",
        primaryHover: "#ff4d5a",
        accent: "#a3ff12",
        bgPrimary: "#111111",
        bgSecondary: "#1c1c1c",
        bgCard: "#2a2a2a",
        textPrimary: "#f5f5f5",
        textSecondary: "#9ca3af",
        cta: "#D90429",
        acid: "#A8FF00",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      fontFamily: {
        title: ["Frijole", "cursive"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
