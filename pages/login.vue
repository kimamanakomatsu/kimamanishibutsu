<script setup lang="ts">
/* ──────────────────────────────────────────────
   共通ステート & Supabase 認証
────────────────────────────────────────────── */
const mode = ref<"login" | "register">("login");
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");
const showPw = ref(false);

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

/* ログイン済みならダッシュボードへ */
watch(user, (u) => u && router.replace("/dashboard"), { immediate: true });

/* ログイン／サインアップ送信 */
const onSubmit = async () => {
  loading.value = true;
  errorMsg.value = "";

  let error;
  if (mode.value === "login") {
    ({ error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    }));
  } else {
    ({ error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        // ← ここを本番 URL に合わせる
        emailRedirectTo:
          "https://kimamanishibutsu-js45zs3gw-kimamanakomatsus-projects.vercel.app/confirm",
      },
    }));
  }

  loading.value = false;
  if (error) errorMsg.value = error.message;
};
</script>

<template>
  <!-- 背景をふわっとグラデーション → 画面中央にカード -->
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-blue-50 px-4"
  >
    <!-- カード本体 -->
    <div
      class="w-full max-w-md rounded-2xl bg-white/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-md p-8"
    >
      <!-- タブ切替 with トランジション -->
      <div class="mb-8 flex justify-center gap-6 text-lg font-semibold">
        <button
          @click="mode = 'login'"
          :class="[
            'transition-colors duration-200',
            mode === 'login'
              ? 'text-indigo-700 border-b-2 border-indigo-700'
              : 'text-gray-400 hover:text-indigo-600',
          ]"
        >
          ログイン
        </button>
        <button
          @click="mode = 'register'"
          :class="[
            'transition-colors duration-200',
            mode === 'register'
              ? 'text-indigo-700 border-b-2 border-indigo-700'
              : 'text-gray-400 hover:text-indigo-600',
          ]"
        >
          新規登録
        </button>
      </div>

      <!-- フォーム (フェード切替) -->
      <Transition name="fade" mode="out-in">
        <form :key="mode" @submit.prevent="onSubmit" class="space-y-5">
          <!-- email -->
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              placeholder="メールアドレス"
              class="peer w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 shadow-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            <!-- icon -->
            <svg
              class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-indigo-600"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" stroke="none" />
              <path d="M4 4l8 9 8-9" />
            </svg>
          </div>

          <!-- password with toggle -->
          <div class="relative">
            <input
              v-model="password"
              :type="showPw ? 'text' : 'password'"
              minlength="6"
              required
              placeholder="パスワード"
              class="peer w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 shadow-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="button"
              @click="showPw = !showPw"
              class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                v-if="!showPw"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.961 9.961 0 012.137-3.592m3.685-2.5A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.043 5.169M15 12a3 3 0 00-3-3m0 0a2.997 2.997 0 00-2.937 2.382M12 15a2.997 2.997 0 002.937-2.382M3 3l18 18"
                />
              </svg>
            </button>
          </div>

          <!-- submit -->
          <button
            :disabled="loading"
            class="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {{
              loading
                ? "送信中…"
                : mode === "login"
                  ? "ログイン"
                  : "アカウント作成"
            }}
          </button>
        </form>
      </Transition>

      <!-- エラー表示 -->
      <Transition name="fade">
        <p
          v-if="errorMsg"
          key="error"
          class="mt-6 text-center text-sm text-red-600"
        >
          {{ errorMsg }}
        </p>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
/* シンプルなフェード */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
