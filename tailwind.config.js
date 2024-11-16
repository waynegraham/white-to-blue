import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        print: { raw: 'print'},
        screen: { raw: 'screen' },
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

