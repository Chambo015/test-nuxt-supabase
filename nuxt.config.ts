// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/supabase"],
  supabase: {
    redirect: false
  },
  devtools: { enabled: true }
})
