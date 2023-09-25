<template>
  <!-- search box -->
  <keep-alive>
    <div ref="rootEl" class="w-[390px] bg-white h-full ml-3">
      <h1 class="text-2xl font-bold mt-3 mb-3 text-gray-600">Notifications</h1>
      <div class="flex items-center justify-between">
        <h1 class="text-gray-500">All notifications</h1>
        <base-button size="small" variant="primaryRevert"
          >Mark all as read</base-button
        >
      </div>
      <!-- divider -->
      <div class="h-[1px] bg-gray-300 my-3"></div>

      <div class="" v-if="loading">
        <img
          class="w-9 mx-auto"
          src="~/assets/images/loader.svg"
          alt="loader"
        />
      </div>

      <div v-else class="overflow-y-auto h-[85vh] flex flex-col">
        <notification-item
          v-for="notification of notifications"
          :key="notification?.id"
          :notification="notification"
        />
      </div>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { PropType } from "vue";

const { fetchNotifications } = useNotificationApi();
const notificationStore = useNotificationStore();

const props = defineProps({
  notificationElementRef: {
    type: Object as PropType<HTMLDivElement | null>,
  },
});

const emits = defineEmits(["close"]);

const rootEl = ref<HTMLDivElement | null>(null);
const loading = ref(false);
const { notifications } = storeToRefs(notificationStore);

const closeNotificationBar = (e: any) => {
  e.stopPropagation();

  if (!rootEl.value) return;

  if (
    !rootEl.value.contains(e?.target) &&
    !props.notificationElementRef?.contains(e?.target)
  ) {
    emits("close", true);
  }
};

const callNotiApi = async () => {
  loading.value = true;
  const { data } = await fetchNotifications();
  loading.value = false;

  if (data.value) {
    notificationStore.setNotifications(data.value?.data ?? []);
  }
};

onMounted(async () => {
  await nextTick();

  if (process.client) {
    window.addEventListener("click", closeNotificationBar);
  }

  await callNotiApi();
});

onUnmounted(() => {
  if (process.client) {
    window.addEventListener("click", closeNotificationBar);
  }
});
</script>
