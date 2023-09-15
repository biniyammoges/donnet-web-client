<template>
  <div
    :class="[!isSender ? '' : 'self-end flex-row-reverse']"
    class="chat flex w-auto"
  >
    <div
      :class="[!isSender ? 'mr-2 ' : 'bg-blue-600 text-white ml-2 ']"
      class="bg-blue-100 relative py-2 rounded-lg px-3 w-auto mb-2 max-w-[500px]"
    >
      <div
        :class="[!isSender ? '-left-1' : '-right-1 bg-blue-600']"
        class="absolute w-4 h-4 bg-blue-100 rotate-45 top-[6px]"
      ></div>

      <!-- reply -->
      <div
        v-if="chat.parentChat"
        :class="[
          !isSender ? 'text-gray-900 border-l-gray-700 ' : 'text-blue-100 ',
        ]"
        class="border-l-[2px] py-1 my-1 cursor-pointer"
      >
        <p class="ml-2 line-clamp-2">
          {{ chat.parentChat?.message }}
        </p>
      </div>

      <div class="flex items-center gap-x-1 relative pr-4">
        <p>
          {{ chat.message }}
        </p>
        <span
          v-if="isSender"
          :class="[chat.isSeen ? 'i-mdi-check-all' : 'i-mdi-check']"
          class="absolute bottom-1 -right-[5px] text-blue-200"
        ></span>
      </div>
    </div>

    <!-- reply button -->
    <button class="reply-button">
      <span class="i-mdi-keyboard-return"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ChatEntity } from "types";
import { PropType } from "vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const props = defineProps({
  chat: {
    type: Object as PropType<ChatEntity>,
    required: true,
  },
});

const isSender = computed(() => props.chat?.senderId === user?.value?.id);
</script>

<style scoped>
.reply-button {
  @apply invisible text-xl text-gray-500 hover:text-gray-800;
}

.chat:hover .reply-button {
  @apply visible;
}
</style>
