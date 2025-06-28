<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const currentUser = useCurrentUser();

onMounted(() => {
  // セッション復元
  const { data } = useSupabaseUser(); // ← @nuxtjs/supabase が提供
  currentUser.value = data.value;
  // 以後 change イベントを listen しても OK
});
</script>
