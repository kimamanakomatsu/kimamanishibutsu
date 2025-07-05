<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#imports";
import { useSupabaseClient } from "#imports";

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const loading = ref(true);
const errorMsg = ref("");

onMounted(async () => {
  try {
    // Magic Link (Hash方式)は従来通り
    if (window.location.hash.includes("access_token=")) {
      const { error } = await supabase.auth.getSessionFromUrl();
      if (error) throw error;
      return router.replace("/dashboard");
    }
    // PKCE: /confirm?code=xxxx&state=yyyy
    else if (route.query.code && route.query.state) {
      const state = String(route.query.state);
      const code = String(route.query.code);
      const key = `supabase.auth.flow_state.${state}`;
      // localStorageにすでにcode_verifierがあれば即認証
      if (localStorage.getItem(key)) {
        await exchangeCode(code);
      } else {
        // なければstorageイベントで待機＆15秒タイムアウト
        loading.value = true;
        const timeout = setTimeout(() => {
          window.removeEventListener("storage", storageListener);
          errorMsg.value =
            "認証に失敗しました。時間をおいて再度お試しください。";
          loading.value = false;
        }, 15000);
        // storageイベントでflow_stateが追加されたら認証を続行
        const storageListener = (event: StorageEvent) => {
          if (event.key === key) {
            clearTimeout(timeout);
            window.removeEventListener("storage", storageListener);
            exchangeCode(code);
          }
        };
        window.addEventListener("storage", storageListener);
      }
    } else {
      throw new Error(
        "この画面では認証コードが取得できませんでした。\n\n" +
          "・元の画面でダッシュボードが表示されている場合は、そのままご利用ください。\n" +
          "・表示されない場合は、元の画面を再読み込みしてください。"
      );
    }
  } catch (e: any) {
    errorMsg.value = e.message ?? "確認に失敗しました";
  } finally {
    loading.value = false;
  }
});

// 認証処理を共通化
const exchangeCode = async (code: string) => {
  loading.value = true;
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    router.replace("/dashboard");
  } catch (err: any) {
    errorMsg.value = err.message ?? "確認に失敗しました";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="min-h-screen flex items-center justify-center">
    <div>
      <p v-if="loading">メール確認中…しばらくお待ちください</p>
      <p v-else class="text-center text-red-600">{{ errorMsg }}</p>
    </div>
  </section>
</template>
