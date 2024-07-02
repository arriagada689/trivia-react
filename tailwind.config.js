/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C2E33',
        secondary: {
          DEFAULT: '#DC5F00',
          light: '#FF8A33',
          dark: '#8A3900'
        },
        lighterPrimary: '#686D76',
        light: '#EEEEEE',
        leaderboard: '#F9F9F9',
        leaderboardSelected: '#FFD700'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}

