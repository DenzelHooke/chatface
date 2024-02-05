/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        blackishPurple: "#151519",
        lightBlackishPurple: "#1C1C20",
        deepBrightBlue: "#0D4FCF",
        lighterDeepBrightBlue: "#2461D6",
        lightPurple: "#252534",
      },
    },
  },
  plugins: [],
};
