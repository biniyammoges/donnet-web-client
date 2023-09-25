<template>
  <nuxt-link
    @click="emits('close')"
    :to="`/u/`"
    :class="[notification.isRead ? '' : 'font-normal']"
    class="px-2 block hover:bg-blue-50 py-2 rounded-xl"
    :key="notification.id"
  >
    <div class="profile flex">
      <div class="avatar mr-2 block relative h-10 w-10 rounded-full">
        <img
          v-if="notification?.sender?.avatar"
          :src="notification?.sender?.avatar?.url"
          alt="image"
          class="h-10 w-10 rounded-full object-cover border border-yellow-500"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
        >
          {{
            joinFirstCharacters(
              notification?.sender?.firstName,
              notification?.sender?.lastName
            )
          }}
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-gray-500 text- leading-5 truncate">
          {{ notification?.message }}
        </p>
        <p
          v-if="notification.createdAt"
          class="text-gray-400 text-sm leading-5"
        >
          {{ dateToTimeAgo(new Date(notification.createdAt)) }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { NotificationEntity } from "types";
import { PropType } from "vue";

const {} = useNotificationApi()

const props = defineProps({
  notification: {
    type: Object as PropType<NotificationEntity>,
    required: true,
  },
});

const emits = defineEmits(["close"]);
</script>
