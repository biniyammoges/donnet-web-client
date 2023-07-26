<template>
  <nuxt-link
    v-if="tag === 'link'"
    :to="to"
    class="relative h-[40px] w-[40px] lg:w-[200px] lg:px-3 flex rounded-full lg:justify-start items-center justify-center text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600"
  >
    <slot name="icon"></slot>
    <span class="text-base ml-3 hidden lg:inline-block truncate">{{
      title
    }}</span>
    <span
      v-if="badge"
      class="bg-red-400 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center absolute sm:top-0 sm:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-3"
      >{{ badge }}</span
    >
  </nuxt-link>

  <button
    v-else
    @click="emit('action')"
    class="relative h-[40px] w-[40px] lg:w-[200px] lg:px-3 flex items-center lg:justify-start justify-center rounded-full text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600"
  >
    <slot name="icon"></slot>
    <span class="text-base ml-3 hidden lg:inline-block truncate">{{
      title
    }}</span>
    <span
      v-if="badge"
      class="bg-red-400 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center absolute sm:top-0 sm:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-3"
      >{{ badge }}</span
    >
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";
const emit = defineEmits(["action"]);

const props = defineProps({
  tag: {
    type: String as PropType<"button" | "link">,
    default: "link",
  },

  to: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },
  badge: Number,
});
</script>

<style scoped>
a.router-link-exact-active {
  @apply bg-blue-50 text-blue-800 border-[0.5px] border-blue-600;
}
</style>
