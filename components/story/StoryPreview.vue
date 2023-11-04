<template>
  <div
    class="max-h-[250px] cursor-pointer h-full w-[150px] overflow-hidden rounded-xl relative flex items-center justify-center"
  >
    <!-- overlay -->
    <div
      class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 z-20"
    ></div>
    <!-- story image -->
    <div class="absolute top-0 left-0 w-full h-full z-10">
      <img
        :src="story?.medias[0].file.url"
        alt="story image"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="z-40">
      <div class="avatar relative">
        <img
          v-if="story.creator?.avatar?.url"
          :src="story.creator.avatar.url"
          alt="image"
          class="h-full w-full rounded-full object-cover border border-yellow-500"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
        >
          {{
            joinFirstCharacters(
              story.creator?.firstName,
              story.creator?.lastName
            )
          }}
        </div>
        <span
          :class="[story.creator?.isOnline ? 'bg-green-500' : 'bg-gray-300']"
          class="h-[11px] w-[11px] bottom-1 -right-[1px] absolute rounded-full"
        ></span>
      </div>
      <h1 class="text-white font-mediums mt-2">
        {{ story?.creator?.firstName + " " + story?.creator?.lastName ?? "" }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StoryEntity } from "types";
import { PropType } from "vue";

const props = defineProps({
  story: {
    type: Object as PropType<StoryEntity>,
    required: true,
  },
});
</script>

<style scoped>
.avatar {
  @apply h-14 w-14 rounded-full border-2 border-white z-40;
}
</style>
