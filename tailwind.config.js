/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        background: '#f3f4f6',
        primary: '#00a0be',
        secondary: '#007896',
        description: '#1e293b',
        portfolio: '#9ca3af',
        clients: '#6b7280',
        footer: '#1e1e1e',
        footerline: '#323232',
        title: '#020617',
        footext: '#f8fafc', 
      },
      screens: {
        '2xl': '1320px',
      },
    },
  },
  plugins: [],
}

