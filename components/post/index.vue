<template>
  <div class="w-full mt-4" ref="postRef">
    <post-detail"/>
    <post-item v-for="p of posts" :key="p.id" :post="p" />
    <div
      v-if="!posts.length"
      class="mt-4 flex flex-col items-center rounded-xl py-4 bg-white"
    >
      <div class="max-w-[400px]">
        <div class="flex items-center justify-center">
          <span
            class="i-mdi-check-circle-outline text-2xl text-gray-600"
          ></span>
          <h1 class="text-xl text-gray-600 ml-1">You have reached the end!</h1>
        </div>
        <p class="text-gray-400 mt-1">
          Please follow more people to to have more feeds
        </p>
      </div>
      <base-button
        ><span class="i-mdi-user-add mr-1 text-xl"></span> FInd
        Friends</base-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import PostItem from "./PostItem.vue";

const { fetchPosts } = usePostApi();
const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const page = ref(1);
const limit = ref(8);
const postRef = ref<HTMLDivElement | null>(null);

const fetchOnScroll = async () => {
  const { data } = await fetchPosts({ page: page.value, limit: limit.value });
  postStore.setPosts({
    data: [...posts.value, ...data.value?.data!],
    total: data.value?.total!,
  });
};

// TODO - implete auto fetch on scroll
postRef.value?.addEventListener("scroll", async () => {
  if (postRef.value) {
    const p = postRef.value;

    if (p.scrollTop + p.clientHeight >= p.scrollHeight) {
      page.value += 1;
      await fetchOnScroll();
    }
  }
});
// onUnmounted(() => postRef.value?.removeEventListener("scroll", () => {}));
</script>
