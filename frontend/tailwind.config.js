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
      'lightred':'#FFB4AD',
      'bgray':'#575757',
      'black':'#000000'
    },screens: {
      'phone':'120px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      'poppins': ['Poppins'],
   }
  },
  plugins: [],
}

