/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    colors:{
      'black': '#1a1a1a',
      'light-black': '#2a2a2a',
      'white': '#ffffff',
      'light-white': '#FFFFD9',
      'true-blue': '#3066be',
      'light-true-blue': '#7a9edc',
      'ochre': '#d17a22',
      'maize': '#e7e247',
      'light-maize': '#f7f7a7',
      'transparent-black': 'rgba(0, 0, 0, 0.5)',
    },
    fontSize:{
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    extend: {
      scale: {
        '-100' : '-1', 
      },
    },
  },
  plugins: [],
}

