<!-- app.vue -->
<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { useSupabaseClient } from "@supabase/auth-helpers-nuxt";

/** 全アプリで参照できるユーザー状態を composable に逃がすのもアリ */
export const currentUser = ref(null);

const supabase = useSupabaseClient();
let unsubscribe: (() => void) | undefined;

// ① 初回ロード時にセッションを取得
onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  currentUser.value = data.session?.user ?? null;

  // ② ログイン / ログアウトなどの変化を監視
  unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
    currentUser.value = session?.user ?? null;
  }).data.subscription.unsubscribe;
});

// クリーンアップ
onBeforeUnmount(() => {
  unsubscribe?.();
});
</script>

<template>
  <!-- ここは従来通り -->
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <!-- ← <NuxtWelcome /> から通常のページ描画へ -->
  </div>
</template>
