<template>
  <div class="flex lg:justify-center gap-x-4">
    <div class="min-h-screen bg-gray-100 p-4 max-w-[555px]">
      <Story />
    </div>
    <div class="bg-gray-300 max-w-[300px] w-full hidden lg:block"></div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

useHead({
  title: "Feed posts from ...",
});
</script>
