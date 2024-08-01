// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth", "@nuxt/image"],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      paystackPK: process.env.PAYSTACK_PUBLIC_KEY,
    },
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
        getSession: { path: "/session", method: "get" },
        signUp: { path: '/register', method: 'post' },
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
});