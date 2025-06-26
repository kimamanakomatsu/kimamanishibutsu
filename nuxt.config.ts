import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    // 既存
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    // 追加
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/content'
  ],

  image: {   // @nuxt/image
    provider: 'ipx'          // IPX なら追加設定は不要。Vercel に合わせるなら 'vercel' も可
  },

  colorMode: {               // @nuxtjs/color-mode
    classSuffix: '',
    preference: 'system'     // ユーザーの OS 設定を優先
  },

  content: {                 // @nuxt/content
    highlight: { theme: 'github-dark' }
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
