<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#imports"; // Nuxt auto-import
import { useSupabaseClient } from "#imports";

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const loading = ref(true);
const errorMsg = ref("");

onMounted(async () => {
  console.log(
    "[confirm] mounted, query=",
    route.query,
    "hash=",
    window.location.hash
  );
  try {
    // 1) ハッシュ形式 (#access_token=) があれば getSessionFromUrl
    if (window.location.hash.includes("access_token=")) {
      console.log("[confirm] using getSessionFromUrl()");
      const { error } = await supabase.auth.getSessionFromUrl();
      if (error) throw error;
    }
    // 2) クエリ形式 (?code=xxx) があれば exchangeCodeForSession
    else if (route.query.code) {
      const code = route.query.code as string;
      console.log("[confirm] using exchangeCodeForSession, code=", code);
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    } else {
      throw new Error("no access_token or code in URL");
    }

    // 成功したらダッシュボードへ
    console.log("[confirm] success, redirecting to /dashboard");
    return router.replace("/dashboard");
  } catch (e: any) {
    console.error("[confirm] error", e);
    errorMsg.value = e.message ?? "確認に失敗しました";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="min-h-screen flex items-center justify-center">
    <div>
      <p v-if="loading">メール確認中…しばらくお待ちください</p>
      <p v-else class="text-center text-red-600">{{ errorMsg }}</p>
    </div>
  </section>
</template>
