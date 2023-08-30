/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors:{
      "based":'#BC210D',
      "white":'#ffffff',
      "green":'#15803d',
      'gray':'#9ca3af',
      'darkgreen':'#438845',
      'lightred':'#FFB4AD'
    },
    fontFamily: {
      'poppins': ['Poppins'],
   }
  },
  plugins: [],
}

