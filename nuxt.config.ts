// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth", "@nuxt/image", "nuxt-swiper", "nuxt-tiptap-editor", "@nuxtjs/robots", "@nuxtjs/sitemap", "nuxt-og-image"],

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      paystackPK: process.env.PAYSTACK_PUBLIC_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.vansfieldlifestylemd.com",
    },
  },

  site: { 
    url: 'https://www.vansfieldlifestylemd.com/', 
    name: 'Vansfield Lifestyle MD' 
    }, 

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },

  robots: {
    disallow: ["/dashboard", "/login", "/register", "/verify", "/unauthorized"],
  },

  image: {
    format: ['webp']
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
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "description", content: "Vansfield Lifestyle MD, Your wellness journey begins here" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "author", content: "Vansfield Lifestyle MD" },
        { property: "og:site_name", content: "Vansfield Lifestyle MD" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
