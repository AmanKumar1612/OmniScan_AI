/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'omni-dark': '#060b19',
        'omni-card': 'rgba(10, 18, 38, 0.7)',
        'omni-cyan': '#00B4D8',
        'omni-teal': '#00E5FF',
        'omni-red': '#FF3366',
        'omni-yellow': '#FFD60A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
