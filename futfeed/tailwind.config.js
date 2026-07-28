/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'brand': 'var(--color-brand)',
        'brand-accent': 'var(--color-accent)',
        'text-main': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
      }
    },
  },
  plugins: [],
}