const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'spartan': ['"League Spartan"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
