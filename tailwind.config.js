/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tr2n': ['TR2N', 'sans-serif'],
      },
      colors: {
        tron: {
          dark: '#000814',
          darker: '#000408',
          surface: '#001428',
          'surface-hover': '#00203c',
          glow: '#00a8ff',
          accent: '#00e5ff',
          text: '#c5e1ff',
          dim: '#6a8bb5',
        },
        primary: {
          DEFAULT: '#00a8ff',
          hover: '#0090e0',
        },
      },
      boxShadow: {
        'tron-sm': '0 0 5px rgba(0, 168, 255, 0.3)',
        'tron-md': '0 0 10px rgba(0, 168, 255, 0.5)',
        'tron-lg': '0 0 20px rgba(0, 168, 255, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'tron-pulse': 'tronPulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        tronPulse: {
          '0%': { boxShadow: '0 0 5px rgba(0, 168, 255, 0.5)' },
          '50%': { boxShadow: '0 0 15px rgba(0, 168, 255, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 168, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
