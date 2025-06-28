// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/content'
  ],

  // @nuxtjs/supabase モジュールの設定は、トップレベルに `supabase` オブジェクトとして記述します。
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
  },
  
  /* ← ★ 追加 ★ */
  // runtimeConfig: {
  //   public: {
  //     supabase: {
  //       url: process.env.SUPABASE_URL ?? 'https://gsqzeofejwjjwcpigkhr.supabase.co',
  //       key: process.env.SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcXplb2ZlandqandjcGlna2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDE2NTcsImV4cCI6MjA2NjIxNzY1N30.fZEbaFttcrf0k2eITyd_B_RfGm7MBbp3TKeYvK5P9dY'
  //     }
  //   }
  // },

  image: { provider: 'ipx' },
  colorMode: { classSuffix: '', preference: 'system' },
  content: { highlight: { theme: 'github-dark' } },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
