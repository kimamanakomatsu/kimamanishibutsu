// middleware/auth.ts  ── ログイン必須ガード
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // クライアント側で未ログインなら /login へ
  if (!user.value && process.client) {
    return navigateTo('/login')
  }
})
