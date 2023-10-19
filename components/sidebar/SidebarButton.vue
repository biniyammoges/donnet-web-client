<template>
  <nuxt-link
    v-if="tag === 'link'"
    :to="to"
    :class="[collapsed ? 'collapsed' : desktopSize ? 'enlarged' : 'collapsed']"
    class="sidebar-button"
  >
    <slot name="icon"></slot>
    <span class="title ml-3 text-base">{{ title }}</span>
    <span v-if="badge" class="badge">{{ badge }}</span>
  </nuxt-link>

  <button
    v-else
    @click="emit('action')"
    :class="[collapsed ? 'collapsed' : desktopSize ? 'enlarged' : 'collapsed']"
    class="sidebar-button"
  >
    <slot name="icon"></slot>
    <span class="title ml-3 text-base">{{ title }}</span>
    <span v-if="badge" class="badge">{{ badge }}</span>
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PropType } from "vue";
const route = useRoute();
const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);

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

const screenWidth = ref(0);
const desktopSize = computed(() => screenWidth.value >= 1024);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

watch(screenWidth, () => {
  // excude expanding sidebar for message page
  if (!route.path.startsWith("/message") && screenWidth.value >= 1024) {
    sidebarStore.setCollapsed(false);
  } else {
    sidebarStore.setCollapsed(true);
  }
});

onMounted(() => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.sidebar-button {
  @apply relative flex rounded-full text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600;
}

a.router-link-exact-active {
  @apply bg-blue-50 text-blue-800 border-[0.5px] border-blue-600;
}

.collapsed {
  @apply h-[40px] w-[40px] items-center justify-center;
}

.collapsed .title {
  @apply hidden;
}

.badge {
  @apply bg-red-400 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center absolute;
}

.collapsed .badge {
  @apply top-0 right-0;
}

.enlarged .badge {
  @apply top-1/2 -translate-y-1/2 right-3;
}

.enlarged {
  @apply h-[40px] w-[200px] px-3 justify-start items-center;
}

.enlarged .title {
  @apply inline-block truncate;
}
</style>
