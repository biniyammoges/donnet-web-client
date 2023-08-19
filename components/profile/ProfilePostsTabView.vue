<template>
  <div class="flex items-center justify-start flex-wrap gap-2">
    <div class="post" v-for="p of posts" :key="p">
      <div
        class="flex justify-center items-center bg-gray-50 h-full p-5 text-center"
        v-if="p % 2 != 0"
      >
        <p class="line-clamp-3 text-gray-900 text-xl">
          We reward success at each stage in your Upwork journey with a badge
          that helps you win more work from top clients. Get and maintain a
          badge by consistently delivering great results for your clients. Learn
          more
        </p>
      </div>
      <template v-else>
        <div class="overlay"></div>
        <img src="~/assets/images/image-1.jpg" alt="ss" />
      </template>

      <!-- like and comment count -->
      <div
        class="like flex absolute bottom-2 left-3 z-30 gap-x-3 transition-opacity opacity-0 invisible"
      >
        <p
          :class="[p % 2 === 0 ? 'text-white' : 'text-gray-600']"
          class="flex items-center gap-x-1"
        >
          <span class="i-mdi-heart-outline"></span>
          14k
        </p>
        <p
          :class="[p % 2 === 0 ? 'text-white' : 'text-gray-600']"
          class="flex items-center gap-x-1"
        >
          <span class="i-mdi-comment-outline"></span>
          1.2k
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const posts = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

onMounted(() => console.log("Mounted"));
</script>

<style scoped>
.post {
  @apply relative max-w-[270px] w-full h-[163px] rounded-xl overflow-hidden  cursor-pointer border-[0.5px] border-gray-500;
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

.post:hover > div {
  @apply opacity-100 visible;
}
</style>
