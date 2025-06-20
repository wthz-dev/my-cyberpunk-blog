/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f0ff',
        'cyber-pink': '#ff00ff',
        'cyber-yellow': '#ffff00',
        'cyber-black': '#0d0d0d',
        'cyber-dark': '#1a1a1a',
        'cyber-gray': '#333333',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'share-tech-mono': ['"Share Tech Mono"', 'monospace'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'cyber': '0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(255, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
