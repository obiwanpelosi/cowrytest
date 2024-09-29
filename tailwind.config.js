/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        colorModalBackground: "rgba(58, 68, 93, 0.70)",
      },
    },
  },
  plugins: [],
};
