/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tron-dark': '#000814',
        'tron-surface': '#001428',
        'tron-surface-hover': '#001e3d',
        'tron-glow': '#00a8ff',
        'tron-dim': '#4a6c8c',
        'tron-text': '#c5e1ff',
      },
      boxShadow: {
        'tron-sm': '0 0 5px rgba(0, 168, 255, 0.5)',
        'tron-md': '0 0 10px rgba(0, 168, 255, 0.7)',
        'tron-lg': '0 0 15px rgba(0, 168, 255, 0.9)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
