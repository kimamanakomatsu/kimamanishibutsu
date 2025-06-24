// nuxt.config.ts
export default defineNuxtConfig({
  // --- 追加ここから ---------
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  // --- 追加ここまで ----------

  // 元からあった設定
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
