// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  app:{
    head:{
      title: 'Vansfield Lifestyle MD',
      meta: [
        {name: 'description', content:'Webapp for vansfirls Lifestyle MD'}
      ],
      link: [
        {rel:'stylesheet', href:'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    }
  },
  colorMode: {
    preference: 'light'
  }
})