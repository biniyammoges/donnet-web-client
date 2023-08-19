<template>
  <div
    class="max-w-[400px] w-full bg-white max-h-[80vh] h-auto rounded-2xl py-3 px-4 overflow-auto"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-xl text-gray-600">
        {{ isFollowingModal ? "Followings" : "Followers" }}
      </h1>
      <button class="text-2xl text-gray-600">
        <span class="i-mdi-close"></span>
      </button>
    </div>

    <!-- search -->
    <base-input placeholder="Search " />

    <div class="overflow-y-auto">
      <div
        class="mt-2"
        v-for="d of [
          1, 3, 4, 3, 34, 43, 34, 53, 34, 34, 434, 53, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5,
        ]"
        :key="d"
      >
        <div class="flex justify-between items-center">
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
                {{ joinFirstCharacters("Broo", "Ms") }}
              </div>
            </nuxt-link>
            <div class="flex flex-col justify-center">
              <p class="text-gray-700 leading-5 truncate">Bini Moges</p>
              <p class="text-gray-500 text-sm leading-5">@biniyam</p>
            </div>
          </div>
          <base-button size="small" variant="primaryRevert">Follow</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { PropType } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  isFollowingModal: Boolean,
});
</script>
