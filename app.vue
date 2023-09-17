<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ChatEntity } from "~/types";

const { $socketIo } = useNuxtApp();
const chatStore = useChatStore();

onMounted(async () => {
  await nextTick();
  $socketIo.on(ChatSocketEvents.NewMessage, (data: ChatEntity) => {
    chatStore.updateOnNewMessage(data);
  });
});

onUnmounted(() => $socketIo.removeAllListeners());
</script>
