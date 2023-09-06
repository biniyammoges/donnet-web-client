<template>
  <div
    class="bg-white rounded-r-3xl px-3 md:px-3 py-2 fixed left-0 top-0 bottom-0 flex flex-col items-center"
  >
    <div class="my-5">
      <sidebar-button tag="button" title="Donnet">
        <template #icon> <span class="i-mdi-menu"></span> </template>
      </sidebar-button>
    </div>

    <div class="h-full flex flex-col items-center justify-between z-20 flex-1">
      <!-- Links -->
      <div class="flex flex-col">
        <div class="mb-3">
          <sidebar-button to="/" title="Home">
            <template #icon
              ><span class="i-mdi-home-variant-outline"></span>
            </template>
          </sidebar-button>
        </div>

        <div class="mb-3">
          <sidebar-button
            tag="button"
            title="Search"
            @action="setCollapsed(true)"
          >
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
          <sidebar-button title="Message" to="/message" :badge="3">
            <template #icon>
              <span class="i-mdi-comment-outline"></span>
            </template>
          </sidebar-button>
        </div>

        <div class="mb-3">
          <sidebar-button tag="button" title="Notification" :badge="1">
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
                class="lg:-ml-2 bg-gray-100 lg:bg-transparent w-full lg:w-auto h-full lg:h-auto rounded-full flex items-center justify-center"
              >
                <img
                  v-if="user?.avatar?.url"
                  :src="user.avatar.url"
                  alt="image"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <div v-else class="text-base">
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
</template>

<script setup lang="ts">
import { useModalStore } from "~/store/useModalStore";
import { useAuthStore } from "~/store/useAuthStore";
import { useSidebarStore } from "~/store/useSidebarStore";
import { storeToRefs } from "pinia";

const { getUser: user, destroyAuthData } = useAuthStore();
const { openCreatePostModal } = useModalStore();

const { setCollapsed } = useSidebarStore();
// const {} = storeToRefs(sidebarStore);

const getFirstAndLastName = computed(
  () => `${user?.firstName} ${user?.lastName}`
);
</script>
store/useModalStore
