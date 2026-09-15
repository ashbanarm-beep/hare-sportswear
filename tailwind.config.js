/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F3',
          DEFAULT: '#F5F1E8', // Image Background Exact Color
          200: '#EDE7DC',
          300: '#DFD7C8',
          400: '#C9BEAB'
        },
        hare: {
          orange: '#FF751F', // Exact Logo Orange
          'orange-hover': '#E65E08',
          'orange-light': '#FFA05C',
          'orange-soft': 'rgba(255, 117, 31, 0.12)',
          dark: '#1A1A1A', // Exact Logo Text Black
          charcoal: '#141414',
          espresso: '#242220',
          muted: '#63605B',
          border: 'rgba(26, 26, 26, 0.10)',
          'border-dark': 'rgba(255, 255, 255, 0.10)'
        },
        brand: {
          orange: '#FF751F',
          'orange-hover': '#E65E08',
          'orange-light': '#FFA05C',
          cream: '#F5F1E8',
          dark: '#1A1A1A',
          charcoal: '#141414',
          slate: '#242220',
          card: '#FFFFFF',
          border: 'rgba(26, 26, 26, 0.08)',
          muted: '#63605B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 117, 31, 0.45)',
        'premium': '0 20px 40px -15px rgba(26, 26, 26, 0.08)',
        'premium-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
