/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#030508',
        cardDark: '#0B0F16',
        cardBorder: '#1A2333',
        cardHover: '#1A2338',
        primaryYellow: '#FACC15',
        primaryYellowHover: '#EAB308',
        accentBlue: '#3B82F6',
        accentGreen: '#22C55E',
        accentPurple: '#A855F7',
        accentOrange: '#F97316',
        accentPink: '#EC4899',
        accentCyan: '#06B6D4'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
