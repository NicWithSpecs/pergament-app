/** @type {import('tailwindcss').Config} */

import typographyPlugin from '@tailwindcss/typography'

export default {
  content: ["../index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        '4xl': 'rgba(0, 0, 0, 0.47) 5px 5px 15px'
      },
      transitionTimingFunction: {
        'in-out-bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    },
  },
  plugins: [typographyPlugin],
  darkMode: 'selector'
}

