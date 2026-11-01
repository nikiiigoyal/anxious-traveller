/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt: ['VT323', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
        caveat: ['Caveat', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        paper: {
          light: '#FAF7F0',
          base: '#F4EFE6',
          dark: '#EAE1D2',
          border: '#D8CEBE',
        },
        ink: {
          primary: '#0F1726',
          secondary: '#374151',
          muted: '#6B7280',
          faint: '#9CA3AF',
        },
        goose: {
          orange: '#E8A437',
          dark: '#0F1726',
          white: '#FAF7F0',
          accent: '#D97706',
        },
      },
    },
  },
  plugins: [],
}
