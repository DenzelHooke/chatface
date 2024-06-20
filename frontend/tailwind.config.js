/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "850px",
      lg: "1080px",
      xl: "1800px",
    },

    extend: {
      boxShadow: {
        medium: "0px 0px 9px 4px rgba(0,0,0,0.08)",
      },
      colors: {
        blackishPurple: "#151519",
        lightBlackishPurple: "#1C1C20",
        deepBrightBlue: "#0D4FCF",
        lightBlue: "#3270E8",
        lighterBlue: "#4274d9",
        lighterDeepBrightBlue: "#2e63c7",
        lightPurple: "#252534",
        lightGrey: "#F5F5F5",
        darkGrey: "#828282",
        borderGrey: "#EEEEEE",
        darkBlack: "#181818",
        lightGrey: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
