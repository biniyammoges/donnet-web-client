<template>
  <button
    @click="onClickNotification"
    class="px-2 block hover:bg-blue-50 py-2 rounded-xl"
    :class="{ 'font-medium ': !notification.isRead }"
    :key="notification.id"
  >
    <div class="flex items-center">
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
      <div class="flex flex-col justify-center items-start">
        <p
          :class="[notification.isRead ? 'text-gray-600' : 'text-gray-900']"
          class="text- leading-5 truncate"
        >
          {{ notification?.message }}
        </p>
        <p
          v-if="notification.createdAt"
          :class="[notification.isRead ? 'text-gray-400' : 'text-gray-700']"
          class="text-sm leading-5"
        >
          {{ dateToTimeAgo(new Date(notification.createdAt)) }}
        </p>
      </div>

      <!-- read indicator -->
      <div
        v-if="!notification.isRead"
        class="flex items-center justify-center ml-auto h-2 w-2 rounded-full bg-blue-600"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { NotificationEntity } from "types";
import { PropType } from "vue";

const router = useRouter();
const { readOne } = useNotificationApi();
const authStore = useAuthStore();

const { unreadNotificationCount } = storeToRefs(authStore);

const props = defineProps({
  notification: {
    type: Object as PropType<NotificationEntity>,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const onClickNotification = async () => {
  emits("close");
  if (!props.notification.isRead) {
    await readOne(props.notification.id!);
    authStore.setUnreadNotificationCount(unreadNotificationCount.value - 1);
    props.notification.isRead = true;
  }
  let link = "";
  if (props.notification.action?.startsWith("post")) {
    link = `/?pId=${props.notification.action.split("post/")[1]}`;
  } else if (props.notification.action?.startsWith("user")) {
    link = `/u/${props.notification?.sender?.username}`;
  }

  if (link) {
    router.push(link);
  }
};
</script>
