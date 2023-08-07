<template>
  <div class="flex py-3">
    <nuxt-link to="/" class="avatar mr-1 block relative h-8 w-8 rounded-full">
      <img
        v-if="post?.creator?.avatar"
        :src="post.creator.avatar.url"
        alt="image"
        class="h-8 w-8 rounded-full object-cover"
      />
      <div
        v-else
        class="w-7 h-7 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
      >
        {{}} TZ
      </div>
      <span
        class="hidden h-2 w-2 top-1 right-1 absolute rounded-full bg-green-500"
      ></span>
    </nuxt-link>
    <div>
      <nuxt-link to="/profile" class="text-gray-700 hover:underline"
        >Tigistu Zeleke</nuxt-link
      >
      <p class="text-gray-500">
        <span class="text-blue-700">@iambini</span>, I missed your sisters too
      </p>
      <div class="flex items-center mt-1 gap-x-3">
        <button class="flex items-center text-sm py-[7px] gap-x-[5px]">
          <span
            :class="[false ? 'i-mdi-heart ' : 'i-mdi-heart-outline']"
            class="text-2xl text-blue-600"
          ></span>
          <span class="text-gray-500" v-if="post?.likeCount"
            >{{ 12 }} likes</span
          >
        </button>
        <button
          class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
        >
          <span class="i-mdi-comment-outline text-xl"></span
          ><span>{{ post?.commentCount }} replies</span>
        </button>

        <button
          class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-blue-700"
        >
          <span class="i-mdi-reply-outline text-xl"></span><span> reply</span>
        </button>
      </div>
      <button class="text-blue-800 text-sm">Show replies</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostEntity } from "~/types";

const props = defineProps({
  post: PostEntity,
});
</script>
