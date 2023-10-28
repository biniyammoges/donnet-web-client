<template>
  <div
    class="story-item relative flex-shrink-0 w-full max-w-[90px] overflow-hidden h-[140px] rounded-xl cursor-pointer border-2 border-blue-200"
  >
    <img
      v-if="user?.avatar?.url"
      class="story-image h-full absolute top-0 left-0 w-full object-cover z-20"
      :src="user.avatar.url"
      alt="image"
    />
    <div class="overlay"></div>

    <div class="z-40 w-full absolute bottom-3 border-white">
      <span class="text-center block text-3xl h-8 text-white">
        <span class="i-mdi-plus"></span>
      </span>
      <h1 class="text-lg text-white text-center">Create</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<style scoped>
.overlay {
  @apply absolute top-0 left-0 h-full w-full bg-blue-400 z-30;
  background-color: rgba(0, 0, 0, 0.2);
}

.avatar {
  @apply absolute ml-3 mt-3 overflow-hidden h-8 w-8 rounded-full border-2 border-white z-40;
}
</style>
