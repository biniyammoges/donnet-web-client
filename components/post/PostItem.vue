<template>
  <div class="rounded-xl bg-white p-4 mb-3">
    <div class="flex justify-between items-center">
      <!-- Creator -->
      <div class="creator">
        <nuxt-link
          to="/"
          class="avatar mr-3 block relative h-8 w-8 rounded-full"
        >
          <img
            src="~/assets/images/image-1.jpg"
            alt="image"
            class="rounded-full"
          />
          <span
            class="h-2 w-2 top-0 right-0 absolute rounded-full bg-green-400"
          ></span>
        </nuxt-link>
        <div class="flex flex-col justify-center">
          <nuxt-link
            to="/profile"
            class="text-gray-900 leading-5 hover:underline"
            >Biniyam Moges</nuxt-link
          >
          <p class="text-gray-400 text-sm leading-5">12 mins ago</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600 px-2 text-3xl">
        <span class="i-mdi-dots-horizontal"></span>
      </button>
    </div>

    <!-- Image -->
    <div
      class="cursor-pointer max-h-[400px] overflow-hidden gap-x-1 flex rounded-xl mt-3"
    >
      <img
        class="flex-1 w-1/2 rounded-xl object-cover"
        src="~/assets/images/image-1.jpg"
        alt=""
      />
      <img
        v-if="post === 2"
        class="w-1/2 rounded-xl object-cover"
        src="~/assets/images/image-1.jpg"
        alt=""
      />
      <div class="w-1/2 flex flex-col gap-y-1" v-if="post > 2">
        <img
          class="w-full h-1/2 rounded-xl object-cover"
          src="~/assets/images/image-1.jpg"
          alt=""
        />
        <div class="relative w-full h-1/2 overflow-hidden rounded-xl">
          <img
            class="w-full h-full rounded-xl object-cover"
            src="~/assets/images/image-1.jpg"
            alt=""
          />
          <div
            v-if="post > 3"
            class="text-white flex items-center justify-center absolute h-full w-full left-0 top-0 bg-[rgba(0,0,0,0.6)]"
          >
            <p class="text-3xl">+{{ post - 3 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center mt-3 gap-x-3">
      <button
        class="flex items-center text-sm py-[7px] gap-x-[5px] rounded-full bg-blue-50 px-3"
      >
        <span class="i-mdi-heart-outline text-xl"></span>1.4k
      </button>
      <button
        class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
      >
        <span class="i-mdi-comment-outline text-xl"></span>845
      </button>
    </div>

    <!-- Captions -->
    <p class="mt-3 text-gray-600">
      Hey, today I got my certeficate after many late night, early morning
      thanks to God
    </p>

    <!-- Add comment input -->
    <div class="relative h-11 overflow-hidden rounded-full mt-3">
      <input
        placeholder="Write something about biniyam"
        class="h-full border-[0.6px] border-gray-400 rounded-full px-5 w-full"
      />
      <button
        class="absolute top-1/2 -translate-y-1/2 text-2xl right-3 h-6 text-gray-400 hover:text-gray-600"
      >
        <span class="i-mdi-emoji-outline"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.creator {
  @apply flex items-center justify-start;
}
</style>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Number,
    required: true,
  },
});
</script>
