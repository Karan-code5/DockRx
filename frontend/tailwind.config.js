/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        'primary': '#2563eb',
        'primary-dark': '#1d4ed8',
        'primary-light': '#eff6ff',
        'surface': '#ffffff',
        'surface-muted': '#f8fafc',
        'clinical-blue': '#2563eb',
        'clinical-dark': '#0f172a',
        'clinical-gray': '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 10px 25px -5px rgb(37 99 235 / 0.12), 0 4px 10px -6px rgb(37 99 235 / 0.08)',
        'nav': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 0 0 1px rgb(0 0 0 / 0.03)',
        'button': '0 1px 2px 0 rgb(37 99 235 / 0.15)',
        'glow': '0 0 20px rgb(37 99 235 / 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #3b82f6 100%)',
        'gradient-card': 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.03) 100%)',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}