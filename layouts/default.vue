<template>
  <div class="hidden sm:block" v-if="tokens?.accessToken">
    <sidebar />
  </div>
  <div class="flex-1">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/useAuthStore";

const { tokens } = useAuthStore();
</script>
