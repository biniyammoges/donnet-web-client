<template>
  <div class="mt-3 relative">
    <button class="story-scroll-btn prev">
      <span class="i-mdi-chevron-left"></span>
    </button>
    <button class="story-scroll-btn right">
      <span class="i-mdi-chevron-right"></span>
    </button>
    <div class="story-list overflow-x-auto flex items-center gap-x-3">
      <story-create-button />
      <story-item v-for="s of stories" :key="s"></story-item>
    </div>
  </div>
</template>

<script setup lang="ts">
const stories = [1, 2, 3, 4, 5];
</script>

<style scoped>
.story-list::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}

.story-scroll-btn {
  @apply absolute  top-1/2 -translate-y-1/2 z-50 text-3xl text-white h-7 w-7 rounded-full hover:scale-110 border-[0.5px] border-gray-500 flex items-center;
  background-color: rgba(0, 0, 0, 0.2);
}

.prev {
  @apply -left-3;
}

.right {
  @apply -right-3;
}
</style>
