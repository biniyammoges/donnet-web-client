<template>
  <div class="mt-3 relative">
    <button @click="onScroll('left')" class="story-scroll-btn prev">
      <span class="i-mdi-chevron-left"></span>
    </button>
    <button @click="onScroll('right')" class="story-scroll-btn right">
      <span class="i-mdi-chevron-right"></span>
    </button>
    <div
      ref="storyContainerRef"
      class="story-list overflow-x-auto flex items-center gap-x-3 transition-all"
    >
      <story-create-button />
      <story-item v-for="s of stories" :key="s"></story-item>
    </div>
  </div>
</template>

<script setup lang="ts">
const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const storyContainerRef = ref<HTMLDivElement | null>(null);

console.log(storyContainerRef.value?.scrollLeft);

const onScroll = (position: "left" | "right") => {
  const width = storyContainerRef.value?.getBoundingClientRect().width!;

  const currentScrollPosition = storyContainerRef.value?.scrollLeft ?? 0;

  if (storyContainerRef.value && position === "right") {
    const newScrollPosition = currentScrollPosition + width;
    storyContainerRef.value.scroll({
      left: newScrollPosition,
      behavior: "smooth",
    });
  }

  if (storyContainerRef.value && position === "left") {
    const newScrollPosition = currentScrollPosition - width;
    storyContainerRef.value.scroll({
      left: newScrollPosition,
      behavior: "smooth",
    });
  }

  console.log(storyContainerRef.value?.scrollLeft);
};
</script>

<style scoped>
.story-list::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}

.story-scroll-btn {
  @apply absolute  top-1/2 -translate-y-1/2 z-30 text-3xl text-white h-7 w-7 rounded-full hover:scale-110 border-[0.5px] border-gray-500 flex items-center;
  background-color: rgba(0, 0, 0, 0.2);
}

.prev {
  @apply -left-3;
}

.right {
  @apply -right-3;
}
</style>
