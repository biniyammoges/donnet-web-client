<template>
  <div class="hidden sm:block" v-if="tokens?.accessToken">
    <sidebar />
  </div>

  <!-- Create post form with modal -->
  <post-create-form />

  <div
    :class="{
      'sm:ml-[80px]': tokens?.accessToken,
      'lg:ml-[244px]': tokens?.accessToken && !isOnMessagePage,
    }"
    class="flex-1"
  >
    <slot />
    <div class="sm:hidden">
      <bottom-tabbar />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
import { useAuthStore } from "~/store/useAuthStore";

const isOnMessagePage = computed(() => route.path.startsWith("/message"));

const { tokens } = useAuthStore();
</script>
