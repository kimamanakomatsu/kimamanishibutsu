<script setup lang="ts">
import { ref, watch } from "vue";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

const router = useRouter();
const supabase = useSupabaseClient();
const currentUser = useSupabaseUser();

/* すでにログイン済みならホームへリダイレクト */
watch(
  currentUser,
  (user) => {
    if (user) {
      router.replace("/");
    }
  },
  { immediate: true }
);

/* サインイン処理 */
const onSubmit = async () => {
  loading.value = true;
  errorMsg.value = "";

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  loading.value = false;
  if (error) {
    errorMsg.value = error.message;
  } else {
    router.replace("/"); // 成功後にホームへ
  }
};
</script>

<template>
  <div class="mx-auto max-w-sm py-12">
    <h1 class="mb-6 text-2xl font-bold">ログイン</h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full rounded border px-3 py-2"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full rounded border px-3 py-2"
        required
      />

      <button
        type="submit"
        class="w-full rounded bg-blue-600 py-2 font-semibold text-white disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? "Signing in…" : "Sign in" }}
      </button>
    </form>

    <p v-if="errorMsg" class="mt-4 text-sm text-red-600">{{ errorMsg }}</p>
  </div>
</template>
