// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth", "@nuxt/image", "nuxt-swiper", "nuxt-tiptap-editor", "@nuxtjs/robots", "@nuxtjs/sitemap", "nuxt-og-image"],

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      paystackPK: process.env.PAYSTACK_PUBLIC_KEY,
    },
  },

  site: { 
    url: 'https://vansfieldlifesyle.com', 
    name: 'Vansfield Lifestyle MD' 
    }, 

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },

  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },

  auth: {
    baseURL: process.env.NEXTAUTH_URL,
    globalAppMiddleware: true,
    isEnabled: true,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" }
      }, 
      token: { signInResponseTokenPointer: "/token", type: "Bearer", cookieName: "auth.token", headerName: "Authorization", maxAgeInSeconds: 3600},
      sessionDataType: {id: 'string', name: 'string', email: 'string  '}
    },
  },

  app: {
    head: {
      title: "Vansfield Lifestyle MD",
      meta: [
        { name: "description", content: "Vansfield Lifestyle MD, Your wellness journey begins here" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },

  colorMode: {
    preference: "light",
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  compatibilityDate: "2025-01-06",
});