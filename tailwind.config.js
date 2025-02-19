/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: {
        DEFAULT: "#D4A373", // Marrón claro
        light: "#EAD8C4",
        dark: "#A68258",
      },
      secondary: {
        DEFAULT: "#A3B18A", // Verde pastel
        light: "#DCE4D6",
        dark: "#7C8E63",
      },
      accent: {
        DEFAULT: "#E8AEB7", // Rosa pastel
        light: "#F6D5DA",
        dark: "#C7868F",
      },
      neutral: {
        DEFAULT: "#F5F5F5", // Fondo principal (casi blanco)
        dark: "#B0A8A8",
        light: "#FFFFFF",
      },
      error: "#FF6B6B", // Color adicional para alertas
      success: "#6BCB77",
      warning: "#FFD93D",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
