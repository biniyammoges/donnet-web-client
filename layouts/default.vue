<template>
  <div class="hidden sm:block" v-if="tokens?.accessToken">
    <sidebar />
  </div>

  <!-- Create post form with modal -->
  <post-create-form />

  <div
    :class="{
      'sm:ml-[80px] lg:ml-[244px]': tokens?.accessToken,
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
import { useAuthStore } from "~/store/useAuthStore";

const { tokens } = useAuthStore();
</script>
