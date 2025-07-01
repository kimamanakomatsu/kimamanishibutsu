<script setup lang="ts">
/* ─────────────────────────────────────
   1) このページはログイン必須
────────────────────────────────────── */
definePageMeta({ middleware: "auth" }); // ← middleware/auth.ts が実行されます

/* ─────────────────────────────────────
   2) 状態とロジック
────────────────────────────────────── */
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const loading = ref(false);

/* ログアウト → /login へリダイレクト */
const logout = async () => {
  loading.value = true;
  await supabase.auth.signOut();
  loading.value = false;
  router.replace("/login"); // ← replace で戻る履歴を残さない
};
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
      <!-- 1) ユーザー情報 -->
      <h1 class="mb-6 text-2xl font-bold">ようこそ!</h1>
      <p class="mb-8 text-gray-600">ログイン中のメールアドレス：</p>
      <p class="mb-12 text-lg font-semibold text-red-600">
        {{ user?.email ?? "—" }}
      </p>

      <!-- 2) ログアウトボタン -->
      <button
        @click="logout"
        :disabled="loading"
        class="w-full rounded bg-gray-800 py-2 font-semibold text-white disabled:opacity-50"
      >
        {{ loading ? "ログアウト中…" : "ログアウト" }}
      </button>
    </div>
  </section>
</template>
