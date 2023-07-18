<template>
  <div class="min-h-screen bg-white-gray p-4">
    <Story />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

useHead({
  title: "Feed posts from ...",
});
</script>
