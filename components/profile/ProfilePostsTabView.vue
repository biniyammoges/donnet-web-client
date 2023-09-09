<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-start flex-wrap gap-2"
  >
    <h1 v-if="!posts?.length" class="text-xl text-gray-600">No posts so far</h1>
    <div
      @click="openPreviewPostModal(post)"
      class="post"
      v-for="post of posts"
      :key="post?.id"
    >
      <div
        class="flex justify-center items-center bg-blue-100 h-full p-5 text-center"
        v-if="!post.medias?.length"
      >
        <p class="line-clamp-4 text-gray-900 text-xl">
          {{ post?.caption }}
        </p>
      </div>
      <template v-else>
        <div class="overlay"></div>
        <img
          :src="post.medias[0].file?.url"
          :alt="post.creator?.firstName + '`s post'"
        />
      </template>

      <!-- like and comment count -->
      <div class="like flex absolute bottom-2 left-3 z-30 gap-x-3">
        <p
          :class="[post?.medias?.length ? 'text-white' : 'text-gray-600']"
          class="flex items-center gap-x-1"
        >
          <span class="i-mdi-heart-outline"></span>
          {{ post?.likeCount }}
        </p>
        <p
          :class="[post?.medias?.length ? 'text-white' : 'text-gray-600']"
          class="flex items-center gap-x-1"
        >
          <span class="i-mdi-comment-outline"></span>
          {{ post?.commentCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PostEntity } from "types";
import { PropType } from "vue";
const { openPreviewPostModal } = useModalStore();

const props = defineProps({
  posts: Array as PropType<PostEntity[]>,
});
</script>

<style scoped>
.post {
  @apply relative  w-full h-[215px] rounded-xl overflow-hidden  cursor-pointer;
}

.overlay {
  @apply absolute top-0 left-0 h-full w-full bg-blue-400 z-30;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.6)
  );
}
</style>
