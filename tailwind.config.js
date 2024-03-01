/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-blue" :"#002140",
        "dark0blue-v2":"#ffffff",
        "purple":'#c9d6ff',
        "light-purple":"#e2e2e2"
      }
    },
  },
  plugins: [],
}