<!-- pages/confirm.vue -->
<script setup lang="ts">
/*
  1️⃣ Supabase クライアントはページロード時に
     URL ハッシュ '#access_token' を自動パースして
     セッションを確立してくれる。
  2️⃣ ここでは user が truthy になったら /dashboard へ転送するだけ。
*/
const user = useSupabaseUser();
const router = useRouter();

watch(
  user,
  (u) => {
    if (u) router.replace("/dashboard"); // ← 好きな遷移先に
  },
  { immediate: true }
);
</script>

<template>
  <section class="min-h-screen flex items-center justify-center">
    <p class="text-lg">メール確認中…しばらくお待ちください</p>
  </section>
</template>
