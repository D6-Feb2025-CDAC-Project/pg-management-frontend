/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom Purple Color Palette
        purpleDark: "#6E39A3",
        purpleLight: "#E7D0F5",
        bgGray: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
