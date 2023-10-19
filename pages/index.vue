<template>
  <div class="flex items-start justify-center gap-x-1">
    <div class="min-h-screen pb-16 w-full max-w-[550px] px-3 sm:px-0">
      <div class="flex items-center justify-between bg-white-gray py-3 mt-2">
        <h1
          class="sm:hidden text-3xl font-bold text-gray-900 flex items-center"
        >
          <div class="relative">
            <div
              class="absolutes bg-blue-500 w-5 h-5 rounded-full left-0"
            ></div>
            <div
              class="absolute bg-orange-500 bg-opacity-90 w-5 h-5 rounded-full -right-2 -top-2"
            ></div>
          </div>
          <div class="ml-3">Shatty<span class="text-blue-600">.</span></div>
        </h1>
        <button
          class="sm:hidden p-2 bg-blue-100 rounded-full flex items-center justify-center text-xl text-gray-500"
        >
          <span class="i-mdi-bell-badge"></span>
        </button>
      </div>
      <Story />
      <div v-if="!posts?.length && postLoading" class="mt-4">
        <h1 class="text-2xl text-gray-600">Loading</h1>
      </div>
      <Post v-else />
    </div>
    <div
      class="pt-3 px-4 pb-16 lg:w-[350px] xl:w-[400px] shrink-0 hidden lg:block"
    >
      <div
        class="flex justify-between items-center bg-white px-3 py-2 rounded-lg border-[0.3px]"
      >
        <div class="profile flex items-center">
          <nuxt-link
            :to="`/u/${user?.username}`"
            class="avatar mr-3 block relative h-10 w-10 rounded-full"
          >
            <img
              v-if="user?.avatar"
              :src="user.avatar.url"
              alt="image"
              class="h-10 w-10 rounded-full object-cover"
            />
            <div
              v-else
              class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
            >
              {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
            </div>
          </nuxt-link>
          <div class="flex flex-col justify-center">
            <p class="text-gray-800 text-lg truncate">
              {{ user?.firstName + " " + user?.lastName }}
            </p>
            <p class="text-gray-500 text-base leading-5">
              {{ user?.username }}
            </p>
          </div>
        </div>
        <base-button size="small" variant="errorRevert">Logout</base-button>
      </div>

      <!-- suggestions -->
      <div class="mt-4">
        <h1 class="text-lg text-gray-500 mb-1">Suggested Friends</h1>
        <div class="bg-white rounded-lg border-[0.3px]">
          <div
            v-for="i of [1, 2, 3, 4]"
            :key="i"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <div class="profile flex items-center">
              <nuxt-link
                to="/"
                class="avatar mr-3 block relative h-10 w-10 rounded-full"
              >
                <img
                  v-if="user?.avatar"
                  :src="user.avatar.url"
                  alt="image"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
                >
                  {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
                </div>
              </nuxt-link>
              <div class="flex flex-col justify-center">
                <p class="text-gray-800 text-lg truncate">
                  {{ user?.firstName + " " + user?.lastName }}
                </p>
                <p class="text-gray-500 text-base leading-5">
                  {{ user?.username }}
                </p>
              </div>
            </div>
            <base-button size="small">Follow</base-button>
          </div>
        </div>
      </div>

      <!-- foooter -->
      <div class="mt-4 text-sm">
        <p class="text-gray-500">©2023 DONNET</p>
        <p class="text-gray-500">
          Contact the
          <a href="/" class="text-blue-500 hover:underline">developer</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// composables
const route = useRoute();
const router = useRouter();
const { fetchPosts, fetchOnePost } = usePostApi();
const { setPosts } = usePostStore();
const { user } = useAuthStore();
const { closePreviewPostModal, openPreviewPostModal } = useModalStore();

// state
const { posts } = storeToRefs(usePostStore());
const page = ref(1);
const limit = ref(8);

const { data, pending: postLoading, execute } = await fetchPosts();
setPosts(data?.value!);

const fetchOnScroll = async () => {
  const { data } = await fetchPosts({ page: page.value, limit: limit.value });
  setPosts({
    data: [...posts.value, ...data.value?.data!],
    total: data.value?.total!,
  });
};

const fetchFromId = async (id: string) => {
  const { data } = await fetchOnePost(id);

  if (data.value) {
    openPreviewPostModal(data.value);
    router.push("/");
  }
};

watchEffect(async () => {
  if (route.query["post-id"]) {
    const postId = route.query["post-id"] as string;
    await fetchFromId(postId);
  }
});

onMounted(async () => {
  await nextTick();
  closePreviewPostModal();
  await execute();
});

useHead({
  title: "(1) Donnet",
});
</script>
