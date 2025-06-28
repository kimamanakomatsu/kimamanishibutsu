// composables/useCurrentUser.ts
import { ref, onUnmounted } from 'vue'
import { useSupabaseClient } from '#imports'

export const useCurrentUser = () => {
  const supabase = useSupabaseClient()
  const user = ref<ReturnType<typeof supabase.auth.getUser> extends Promise<infer R> ? R['data']['user'] | null : null>(null)

  // 初期取得
  supabase.auth.getUser().then(({ data }) => {
    user.value = data.user
  })

  // 以降の変化を監視
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => { user.value = session?.user ?? null }
  )

  // composable 利用側が破棄されたら解除
  onUnmounted(() => subscription.unsubscribe())

  return user
}
