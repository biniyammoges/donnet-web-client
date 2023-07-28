<template>
  <div class="flex items-start lg:justify-center gap-x-4">
    <div class="min-h-scree pt-4 px-4 pb-16 max-w-[550px]">
      <Story />
      <Post />
    </div>
    <div class="bg-gray-300 pt-4 px-4 pb-16 min-w-[290px] hidden lg:block">
      <div class="flex justify-between items-center">
        <div class="profile flex">
          <nuxt-link
            to="/"
            class="avatar mr-3 block relative h-10 w-10 rounded-full"
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
            <p class="text-gray-500 text-base leading-5">iambiniy</p>
          </div>
        </div>
        <base-button>View</base-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

useHead({
  title: "(1) Donnet",
});
</script>
