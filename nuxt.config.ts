// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@vee-validate/nuxt', '@pinia/nuxt',],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_URL
    }
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" }]
    }
  },
  veeValidate: {
    autoImports: true
  },
  imports: {
    dirs: ['types', 'store',]
  },
})

