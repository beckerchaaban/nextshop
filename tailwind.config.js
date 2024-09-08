/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./ui/**/*.{js,ts,jsx,tsx,mdx}", "./ui/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        600:"600px",
        800: "800px",
      },
    },
  },
  plugins: [],
};
