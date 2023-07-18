<template>
  <nuxt-link
    v-if="tag === 'link'"
    :to="to"
    class="relative text-center h-[40px] w-[40px] flex rounded-full items-center justify-center text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600"
  >
    <slot name="icon"></slot>
    <span
      v-if="badge"
      class="bg-red-400 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center absolute top-0 right-0"
      >{{ badge }}</span
    >
  </nuxt-link>

  <button
    v-else
    @click="emit('action')"
    class="relative text-center h-[40px] w-[40px] flex items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600"
  >
    <slot name="icon"></slot>
    <span
      v-if="badge"
      class="bg-red-400 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center absolute top-0 right-0"
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
  @apply bg-blue-500 text-white;
}
</style>
