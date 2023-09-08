<template>
  <NuxtLayout>
    <div class="min-w-screen min-h-screen flex items-center justify-center">
      <div class="max-w-[400px] text-center">
        <h1 class="text-4xl font-bold text-">
          Oops! - {{ error?.statusCode }} - something wrong happened
        </h1>
        <p class="mt-3 mb-4 text-lg">
          We are experiencing the issue on server, please be patient with us
        </p>
        <NuxtLink
          class="bg-blue-600 py-2 px-4 rounded-lg text-white text-xl"
          to="/"
          >Redirect To Home</NuxtLink
        >
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();
</script>
