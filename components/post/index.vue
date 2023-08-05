<template>
  <div class="w-full mt-4">
    <post-item v-for="p of posts" :key="p.id" :post="p" />
    <div class="mt-4 flex flex-col items-center rounded-xl py-4 bg-white">
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
        ><span class="i-mdi-plus text-2xl"></span> Create Post</base-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { posts } = storeToRefs(usePostStore());

import { storeToRefs } from "pinia";
import PostItem from "./PostItem.vue";
</script>
