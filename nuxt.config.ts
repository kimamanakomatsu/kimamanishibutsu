// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }
  },

  // @nuxtjs/supabase モジュールの設定は、トップレベルに `supabase` オブジェクトとして記述します。
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
  },
  
  image: { provider: 'ipx' },
  colorMode: { classSuffix: '', preference: 'system' },
  content: { highlight: { theme: 'github-dark' } },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
