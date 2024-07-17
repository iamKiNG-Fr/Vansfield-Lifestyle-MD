/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens:{
        'xs': '300px'
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/img/bgpaattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}

