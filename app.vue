<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ChatEntity, NotificationEntity } from "~/types";

const { getGlobalAppData } = useAuthApi();

const { $socketIo } = useNuxtApp();
const chatStore = useChatStore();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const { unreadMessageCount, unreadNotificationCount } = storeToRefs(authStore);
const { selectedRoom } = storeToRefs(chatStore);

const listenSocketEvents = () => {
  $socketIo.on(ChatSocketEvents.NewMessage, (data: ChatEntity) => {
    chatStore.updateOnNewMessage(data);

    // exception to increase unread count
    if (selectedRoom.value?.id !== data?.chatRoomId)
      authStore.setUnreadMessageCount(unreadMessageCount.value + 1);
  });

  $socketIo.on(
    NotificationSocketEvents.NEW_NOTIFICATION,
    (data: NotificationEntity) => {
      notificationStore.onNewNotificaiton(data);
      authStore.setUnreadNotificationCount(unreadNotificationCount.value + 1);
    }
  );
};

const callGlobalApp = async () => {
  const { data } = await getGlobalAppData();
  if (data.value) {
    authStore.setUnreadMessageCount(data.value.unreadMessageCount ?? 0);
    authStore.setUnreadNotificationCount(
      data.value.unreadNotificationCount ?? 0
    );
  }
};

onMounted(async () => {
  await nextTick();
  listenSocketEvents();
  await callGlobalApp();
});

onUnmounted(() => $socketIo.removeAllListeners());
</script>
