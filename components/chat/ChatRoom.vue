<template>
  <button :class="{ selected }" @click="emits('on-select', room)" class="room">
    <div class="profile flex">
      <div class="avatar">
        <img
          v-if="recipient?.avatar?.url"
          :src="recipient.avatar.url"
          alt="image"
          class="h-full w-full rounded-full object-cover border border-yellow-500"
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

      <div
        :class="{ 'justify-centers items-start': !room?.lastChat }"
        class="flex-1 flex flex-col w-[50%] 2md:max-w-[200px] lg:max-w-[260px]"
      >
        <p
          :class="{ 'font-medium': !isSender && !room.lastChat?.isSeen }"
          class="name"
        >
          {{ recipient?.firstName + " " + recipient?.lastName }}
        </p>
        <p class="text-sm text-gray-500 text-start" v-if="recipient?.isTyping">
          Typing...
        </p>
        <p
          v-else-if="!recipient?.isTyping && room?.lastChat"
          :class="[
            !isSender && !room?.lastChat?.isSeen
              ? 'text-gray-900 font-semibold'
              : ' text-gray-500',
          ]"
          class="message text-start"
        >
          <span v-if="isSender">You:</span>
          {{ room?.lastChat?.message }}
        </p>
      </div>
      <div class="shrink-0 flex flex-col justify-between items-center ml-auto">
        <div class="relative">
          <p v-if="room?.lastChat?.createdAt" class="time absolute right-0">
            {{ dateToTimeAgo(new Date(room?.lastChat?.createdAt)) }}
          </p>
        </div>
        <p v-if="room?.unreadCount" class="badge">{{ room?.unreadCount }}</p>
        <p
          v-else-if="isSender && room.chats?.length"
          class="message-seen-status"
        >
          <span
            :class="[
              room?.lastChat?.isSeen ? 'i-mdi-check-all' : 'i-mdi-check',
            ]"
            class=""
          ></span>
        </p>
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

const recipient = computed(() => {
  return props.room?.chatUsers?.length ? props.room?.chatUsers[0].user : null;
});
const isSender = computed(
  () => props.room?.lastChat?.senderId === user.value?.id
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
  @apply text-sm truncate;
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

.room .message-seen-status {
  @apply text-gray-500;
}

.room.selected .message-seen-status {
  @apply text-blue-100;
}
</style>
