<template>
  <div
    class="bg-white border-r-[0.5px] border-r-gray-300 px-3 md:px-3 py-2 fixed left-0 top-0 bottom-0 flex z-50"
  >
    <div
      class="h-full flex flex-col"
      :class="{
        ' pr-3 border-r-[0.7px]': showSearchBox || showNotificationBox,
        'items-center': collapsed,
      }"
    >
      <div class="my-5">
        <h1
          :class="[collapsed ? 'text-2xl' : 'text-3xl px-3']"
          class="font-bold text-gray-900 flex items-center"
        >
          <div class="relative">
            <div
              class="absolutes bg-blue-500 w-5 h-5 rounded-full left-0"
            ></div>
            <div
              class="absolute bg-orange-500 bg-opacity-90 w-5 h-5 rounded-full -right-2 -top-2"
            ></div>
          </div>
          <div v-if="!collapsed" class="ml-3">
            Shatty<span class="text-blue-600">.</span>
          </div>
        </h1>
      </div>

      <div
        :class="{ 'mt-4': collapsed }"
        class="h-full flex flex-col items-center justify-between z-20 flex-1"
      >
        <!-- Links -->
        <div class="flex flex-col">
          <div class="mb-3">
            <sidebar-button to="/" title="Home">
              <template #icon
                ><span class="i-mdi-home-variant-outline"></span>
              </template>
            </sidebar-button>
          </div>

          <div class="mb-3" ref="searchElementRef">
            <sidebar-button tag="button" title="Search" @action="openSearchBox">
              <template #icon><span class="i-mdi-search"></span></template>
            </sidebar-button>
          </div>

          <div class="mb-3">
            <sidebar-button
              tag="button"
              @action="openCreatePostModal"
              title="Create"
            >
              <template #icon><span class="i-mdi-plus"></span> </template>
            </sidebar-button>
          </div>

          <div class="mb-3">
            <sidebar-button
              title="Message"
              to="/message"
              :badge="unreadMessageCount"
            >
              <template #icon>
                <span class="i-mdi-comment-outline"></span>
              </template>
            </sidebar-button>
          </div>

          <div class="mb-3" ref="notificationElementRef">
            <sidebar-button
              tag="button"
              title="Notification"
              :badge="unreadNotificationCount"
              @action="openNotificationBox"
            >
              <template #icon>
                <span class="i-mdi-bell-outline"></span>
              </template>
            </sidebar-button>
          </div>

          <div class="mb-3">
            <sidebar-button
              :to="`/u/${user?.username}`"
              :title="getFirstAndLastName"
            >
              <template #icon>
                <div
                  :class="[
                    collapsed
                      ? 'h-full w-full'
                      : '-ml-2 bg-transparent w-auto h-auto',
                  ]"
                  class="bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <img
                    v-if="user?.avatar?.url"
                    :src="user.avatar.url"
                    alt="image"
                    class="h-8 w-8 rounded-full object-cover"
                  />
                  <div
                    v-else
                    class="text-base border border-yellow-800 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
                  </div>
                </div>
              </template>
            </sidebar-button>
          </div>
        </div>

        <!-- Logout button -->
        <sidebar-button tag="button" title="Logout" @action="destroyAuthData">
          <template #icon>
            <span class="i-mdi-logout"></span>
          </template>
        </sidebar-button>
      </div>
    </div>

    <sidebar-search-people
      v-if="showSearchBox"
      :user="user"
      @close="closeSearchBar"
      :search-element-ref="searchElementRef"
    />

    <notification-box
      v-if="showNotificationBox"
      @close="closeNotificationBar"
      :notification-element-ref="notificationElementRef"
    />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/store/useModalStore";
import { useAuthStore } from "~/store/useAuthStore";
import { useSidebarStore } from "~/store/useSidebarStore";
import { storeToRefs } from "pinia";
const route = useRoute();

// stores
const authStore = useAuthStore();
const { user, destroyAuthData } = useAuthStore();
const { openCreatePostModal } = useModalStore();
const sidebarStore = useSidebarStore();

// states
const { unreadMessageCount, unreadNotificationCount } = storeToRefs(authStore);
const { collapsed } = storeToRefs(sidebarStore);
const showSearchBox = ref(false);
const searchElementRef = ref<HTMLDivElement | null>(null);
const showNotificationBox = ref(false);
const notificationElementRef = ref<HTMLDivElement | null>(null);

// methods
const openSearchBox = () => {
  showSearchBox.value = true;
};

const closeSearchBar = () => {
  showSearchBox.value = false;
};

const openNotificationBox = () => {
  showNotificationBox.value = true;
};

const closeNotificationBar = () => {
  showNotificationBox.value = false;
};

watch(showSearchBox, () => {
  // exclude expanding sidebar for message page
  if (!route.path.startsWith("/message") && showSearchBox.value) {
    sidebarStore.setCollapsed(showSearchBox.value);
  }
});

watch(showNotificationBox, () => {
  // exclude expanding sidebar for message page
  if (!route.path.startsWith("/message") && showNotificationBox.value) {
    sidebarStore.setCollapsed(showNotificationBox.value);
  }
});

const getFirstAndLastName = computed(
  () => `${user?.firstName} ${user?.lastName}`
);
</script>
store/useModalStore
