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
          v-model="keyword"
          placeholder="Search"
          class="w-full outline-none px-4"
        />

        <span
          @click.stop="clear"
          v-if="keyword.length"
          class="mr-3 text-gray-400 hover:text-gray-700 flex items-center gap-x-1 text-lg i-mdi-close"
        ></span>
      </div>

      <!-- divider -->
      <div class="h-[1px] bg-gray-300 mt-5"></div>

      <!-- search results -->
      <div class="" v-if="loading">
        <img
          class="w-9 mx-auto"
          src="~/assets/images/loader.svg"
          alt="loader"
        />
      </div>
      <div v-else-if="!keyword" class="mt-3 flex items-center justify-between">
        <h1 class="text-lg text-gray-600">Recent searches</h1>
        <button
          class="text-gray-400 hover:text-gray-700 text-sm flex items-center gap-x-1"
        >
          Clear all <span class="text-lg i-mdi-close"></span>
        </button>
      </div>
      <div
        v-else-if="noResult"
        class="text-centers h-full flex items-center justify-center"
      >
        <h1 class="-mt-40 text-xl text-gray-600">
          No result for '{{ keyword }}'
        </h1>
      </div>
      <div v-else class="overflow-y-auto h-full">
        <nuxt-link
          @click="emits('close')"
          :to="`/u/${user?.username}`"
          class="px-2 block hover:bg-blue-50 rounded-xl py-2"
          v-for="user of results"
          :key="user.id"
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
                {{ user?.firstName + " " + user?.lastName }} -
                {{ user?.followerCount ?? 0 }} followers
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

const { searchUser } = useUserApi();

const props = defineProps({
  searchElementRef: {
    type: Object as PropType<HTMLDivElement | null>,
  },
});
const emits = defineEmits(["close"]);

const keyword = ref("");
const rootEl = ref<HTMLDivElement | null>(null);
const results = ref<User[]>([]);
const loading = ref(false);

const noResult = computed(() => {
  return keyword.value && !loading.value && !results.value.length;
});

const clear = () => {
  keyword.value = "";
};

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

watch(keyword, async () => {
  if (!keyword.value.trim()) {
    return (results.value = []);
  }

  loading.value = true;
  const res = await searchUser(keyword.value);
  loading.value = false;

  if (res.data.value) {
    results.value = res.data.value;
  }
});

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
