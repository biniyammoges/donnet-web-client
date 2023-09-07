<template>
  <!-- search box -->
  <keep-alive>
    <div ref="rootEl" class="w-[380px] bg-white h-full ml-3">
      <h1 class="text-2xl font-bold mt-3 mb-5 text-gray-600">
        Search for People
      </h1>

      <!-- search -->
      <div
        class="mb-2 flex items-center h-12 border rounded-full overflow-hidden"
      >
        <input
          type="text"
          v-model="kywrd"
          placeholder="Search"
          class="w-full outline-none px-4"
        />
      </div>

      <!-- search results -->
      <div class="overflow-y-auto h-full">
        <nuxt-link
          @click="emits('close')"
          to="/u/bin"
          class="px-2 block hover:bg-blue-50 rounded-xl py-2"
          v-for="d of [1, 3, 4, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15]"
          :key="d"
        >
          <div class="profile flex">
            <div class="avatar mr-2 block relative h-10 w-10 rounded-full">
              <img
                v-if="user?.avatar"
                :src="user.avatar.url"
                alt="image"
                class="h-10 w-10 rounded-full object-cover border-2 border-yellow-500"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
              >
                {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <p class="text-gray-700 text-lg leading-5 truncate">
                {{ user?.username }}
              </p>
              <p class="text-gray-500 text-sm leading-5">
                {{ user?.firstName + " " + user?.lastName }} - {{ 0 }} followers
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import { User } from "types";
import { PropType } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  searchElementRef: {
    type: Object as PropType<HTMLDivElement | null>,
  },
});
const emits = defineEmits(["close"]);
const kywrd = ref("");
const rootEl = ref<HTMLDivElement | null>(null);

const closeSearchBar = (e: any) => {
  e.stopPropagation();

  if (!rootEl.value) return;

  if (
    !rootEl.value.contains(e?.target) &&
    !props.searchElementRef?.contains(e?.target)
  ) {
    emits("close", true);
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("click", closeSearchBar);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.addEventListener("click", closeSearchBar);
  }
});
</script>
