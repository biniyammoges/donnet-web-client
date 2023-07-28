<template>
  <div class="w-full mt-4">
    <post-item v-for="p of posts" :key="p" :post="p" />
  </div>
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";
const posts = [1, 2, 3, 4, 5, 9, 13];
</script>
