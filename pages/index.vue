<template>
  <div class="flex items-start justify-center gap-x-1">
    <div class="min-h-screen pb-16 w-full max-w-[550px] px-3 sm:px-0">
      <Story />
      <div v-if="!posts?.length && postLoading" class="mt-4">
        <h1 class="text-2xl text-gray-600">Loading</h1>
      </div>
      <Post v-else />
    </div>
    <div class="pt-3 px-4 pb-16 w-[350px] shrink-0 hidden lg:block">
      <div
        class="flex justify-between items-center bg-white p-3 rounded-lg border-[0.3px]"
      >
        <div class="profile flex">
          <nuxt-link
            to="/"
            class="avatar mr-3 block relative h-10 w-10 rounded-full"
          >
            <img
              v-if="user?.avatar"
              :src="user.avatar.url"
              alt="image"
              class="h-8 w-8 rounded-full object-cover"
            />
            <div
              v-else
              class="w-9 h-9 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
            >
              {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
            </div>
            <span
              class="h-2 w-2 top-1 right-1 absolute rounded-full bg-green-400"
            ></span>
          </nuxt-link>
          <div class="flex flex-col justify-center">
            <p class="text-gray-900 leading-5 truncate">
              {{ user?.firstName + " " + user?.lastName }}
            </p>
            <p class="text-gray-500 text-base leading-5">
              {{ user?.username }}
            </p>
          </div>
        </div>
        <base-button size="small" variant="primaryRevert">View</base-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// composables
const route = useRoute();
const { fetchPosts, fetchOnePost } = usePostApi();
const { setPosts } = usePostStore();
const { user } = useAuthStore();
const { closePreviewPostModal, openPreviewPostModal } = useModalStore();

// state
const { posts } = storeToRefs(usePostStore());
const page = ref(1);
const limit = ref(8);
const pId = toRef(route.query?.pId ?? "");

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

  // console.log(data.value);
};

watch(pId, () => {
  console.log(pId.value);
});

onMounted(async () => {
  await nextTick();
  closePreviewPostModal();
  await execute();

  if (route.query?.pId) {
    pId.value = route.query?.pId as string;
    await fetchFromId(pId.value);
  }
});

useHead({
  title: "(1) Donnet",
});
</script>
