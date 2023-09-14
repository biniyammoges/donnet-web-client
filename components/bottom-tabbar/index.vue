<template>
  <div
    class="bg-white border-[0.5px] rounded-t-3xl px-5 py-2 fixed left-0 right-0 bottom-0 flex items-center"
  >
    <div class="h-15 flex items-center justify-between z-20 flex-1">
      <!-- Links -->
      <div class="">
        <bottom-tabbar-button to="/" title="Home">
          <template #icon
            ><span class="i-mdi-home-variant-outline"></span>
          </template>
        </bottom-tabbar-button>
      </div>

      <div class="">
        <bottom-tabbar-button title="Search">
          <template #icon><span class="i-mdi-search"></span> </template>
        </bottom-tabbar-button>
      </div>

      <div class="">
        <bottom-tabbar-button
          tag="button"
          @action="() => console.log('sss')"
          title="Create"
        >
          <template #icon><span class="i-mdi-plus"></span> </template>
        </bottom-tabbar-button>
      </div>

      <div class="">
        <bottom-tabbar-button title="Message" to="/message" :badge="3">
          <template #icon>
            <span class="i-mdi-comment-outline"></span>
          </template>
        </bottom-tabbar-button>
      </div>

      <div class="">
        <bottom-tabbar-button
          :to="`/u/${user?.username}`"
          :title="getFirstAndLastName"
        >
          <template #icon>
            <span class="i-mdi-user-outline"></span>
          </template>
        </bottom-tabbar-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/useAuthStore";
const { user } = storeToRefs(useAuthStore());

const getFirstAndLastName = computed(
  () => `${user?.firstName} ${user?.lastName}`
);
</script>
