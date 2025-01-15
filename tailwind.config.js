import typography from '@tailwindcss/typography';

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
      },
      typography:({ theme })=>({
        DEFAULT:{
          css:{
            '--tw-prose-bullets': theme('color.pink.700'),
            li:{
              p:{
                margin: 0
              }
            }
          }
        }
      })
    },
  },
  plugins: [typography],
}

