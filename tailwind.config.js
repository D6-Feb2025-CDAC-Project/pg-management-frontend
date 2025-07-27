/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom Purple Color Palette
        purpleDarkScale: {
          100: '#EADCF6', // lightest tint
          200: '#CDB1E7',
          300: '#AF86D9',
          400: '#9362C9', // close to base
          500: '#6E39A3', // your original
          600: '#5A2D84',
          700: '#462166',
          800: '#331548', // darkest shade
        },
        purpleDark: '#6E39A3',
        purpleLight: "#E7D0F5",
        bgGray: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
