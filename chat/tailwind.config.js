/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'sm':'240px',
        'md':'640px',
        'lg':'830px',
        'xl':'1080px',
        '2xl':'1302px'
      },
      color:{
        'primary': '#56d1c1',
        'secondary': '#F9FAFB',
        
      }
    },
  },
  plugins: [],
}

