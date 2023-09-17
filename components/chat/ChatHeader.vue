<template>
  <div
    class="sticky z-10 top-0 bg-white flex items-center py-2 px-5 border-b border-b-gray-200"
  >
    <button
      @click="emits('on-room-close')"
      class="2md:hidden text-3xl h-8 mr-2 text-gray-500 hover:text-gray-800"
    >
      <span class="i-mdi-arrow-left"></span>
    </button>
    <div class="flex items-center cursor-pointer">
      <div class="relative w-10 h-10 mr-3">
        <img
          v-if="recipient?.avatar"
          :src="recipient.avatar.url"
          alt="image"
          class="h-full w-full rounded-full object-cover border border-yellow-400"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
        >
          {{ joinFirstCharacters(recipient?.firstName, recipient?.lastName) }}
        </div>
        <span
          :class="[recipient?.isOnline ? 'bg-green-500' : 'bg-gray-300']"
          class="h-[11px] w-[11px] bottom-1 -right-[1px] absolute rounded-full"
        ></span>
      </div>

      <div class="">
        <p class="text-lg leading-5">
          {{ recipient?.firstName + " " + recipient?.lastName }}
        </p>
        <p v-if="recipient.isTyping" class="text-gray-500">Typing...</p>
        <p v-else class="text-gray-500">
          {{
            recipient?.isOnline
              ? "Online"
              : recipient?.lastSeen
              ? `Last seen ${dateToTimeAgo(new Date(recipient.lastSeen))} `
              : ""
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "types";
import { PropType } from "vue";

const props = defineProps({
  recipient: {
    type: Object as PropType<User>,
    required: true,
  },
});
const emits = defineEmits(["on-room-close"]);
</script>
