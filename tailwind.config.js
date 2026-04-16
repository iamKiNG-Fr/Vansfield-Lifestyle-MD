import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.config.ts",
    "./error.vue",
    "./components/**/*.{vue,js,ts}",
    "./composables/**/*.{js,ts}",
    "./layouts/**/*.vue",
    "./middleware/**/*.{js,ts}",
    "./pages/**/*.vue",
    "./server/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/@nuxt/ui/dist/**/*.{js,mjs,ts,vue}",
  ],
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
