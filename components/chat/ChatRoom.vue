<template>
  <button :class="{ selected }" @click="emits('on-select', room)" class="room">
    <div class="profile flex">
      <div class="avatar">
        <img
          v-if="recipent?.avatar?.url"
          :src="recipent.avatar.url"
          alt="image"
          class="h-full w-full rounded-full object-cover"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
        >
          {{ joinFirstCharacters(recipent?.firstName, recipent?.lastName) }}
        </div>
      </div>

      <div class="flex-1 w-full 2md:max-w-[200px] lg:max-w-[260px]">
        <p class="name">
          {{ recipent?.firstName + " " + recipent?.lastName }}
        </p>
        <p class="message text-start">
          <span v-if="isSender" class="font-medium">you:</span> Hi biniyam, hope
          this message finds you well
        </p>
      </div>
      <div class="shrink-0 flex flex-col justify-between items-center ml-auto">
        <p class="time">{{ dateToTimeAgo(lastChat.createdAt) }}</p>
        <p v-if="room?.unreadCount" class="badge">{{ room?.unreadCount }}</p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ChatRoomEntity, SelectRoomEvent } from "types";
import { PropType } from "vue";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  room: {
    type: Object as PropType<ChatRoomEntity>,
    required: true,
  },
});

const emits = defineEmits<SelectRoomEvent>();

const recipent = computed(() => {
  return props.room?.chatUsers?.length ? props.room?.chatUsers[0].user : null;
});
const isSender = computed(() => recipent.value?.id === user.value?.id);
const lastChat = computed(() =>
  props.room?.chats?.length ? props.room.chats[0] : {}
);
</script>

<style scoped>
.room {
  @apply bg-white mb-1 block w-full hover:bg-blue-100 py-2 px-3 rounded-lg;
}

.room.selected {
  @apply bg-blue-600;
}

.room .avatar {
  @apply mr-2 block relative h-10 w-10 rounded-full;
}

.room.selected .avatar > div {
  @apply border-blue-50 bg-blue-100 text-blue-900;
}

.room .name {
  @apply text-gray-800 text-start truncate;
}

.room.selected .name {
  @apply text-white;
}

.room .message {
  @apply text-gray-500 text-sm truncate;
}

.room.selected .message {
  @apply text-blue-100;
}

.room .time {
  @apply text-xs text-blue-900 text-start truncate;
}

.room.room.selected .time {
  @apply text-white;
}

.room .badge {
  @apply text-white text-xs truncate w-5 h-5 flex items-center justify-center rounded-full bg-red-400;
}

.room.selected .badge {
  @apply bg-blue-200 text-gray-900;
}
</style>
