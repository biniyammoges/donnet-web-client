<template>
  <div
    class="story-item relative flex-shrink-0 w-full max-w-[90px] overflow-hidden h-[140px] rounded-xl cursor-pointer border-2 border-blue-200"
  >
    <img
      v-if="story?.medias?.length"
      class="story-image h-full absolute top-0 left-0 w-full object-cover z-20"
      :src="story?.medias[0].file.url"
      alt="image"
    />
    <div class="overlay"></div>

    <div class="avatar">
      <img
        class="h-full absolute top-0 left-0 w-full object-cover z-20"
        src="~/assets/images/image-1.jpg"
        alt="image"
      />
    </div>
    <div class="z-40 absolute w-full bottom-3 px-2">
      <p
        class="truncate creator text-white font-semibold w-full text-xs bottom-3 text-center"
      >
        {{ story?.creator?.firstName + " " + story?.creator?.lastName ?? "" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StoryEntity } from "types";
import { PropType } from "vue";

const props = defineProps({
  story: {
    type: Object as PropType<StoryEntity>,
    requried: true,
  },
});
</script>

<style scoped>
.story-item:hover .story-image {
  @apply scale-110 transition-transform;
}

.overlay {
  @apply absolute top-0 left-0 h-full w-full bg-blue-400 z-30;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8)
  );
}

.avatar {
  @apply absolute ml-3 mt-3 overflow-hidden h-8 w-8 rounded-full border-2 border-white z-40;
}
</style>
