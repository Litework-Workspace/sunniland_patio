/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';

module.exports = {
  content: [
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./layout/*.liquid",
    "./src/styles/tailwind.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

