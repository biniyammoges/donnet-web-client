<template>
  <div class="flex gap-x-7">
    <div
      class="relative shrink-0 avatar w-20 h-20 bg-gray-200 rounded-full"
    ></div>

    <!-- user detail -->
    <div>
      <div>
        <div class="flex items-center gap-x-6">
          <div>
            <!-- user's name -->
            <div class="h-4 rounded-2xl bg-gray-200 w-36" />

            <!-- user's email -->
            <div class="h-3 rounded-2xl mt-3 bg-gray-200 w-36" />

            <!-- user's username -->
            <div class="h-3 rounded-2xl mt-3 bg-gray-200 w-36" />
          </div>
          <div class="w-20 h-7 rounded-xl bg-gray-200"></div>
        </div>

        <!-- followers and posts count indicator -->
        <div class="mt-5 flex gap-x-4">
          <div v-for="f of [1, 3, 4]" :key="f" class="flex gap-x-8">
            <div class="h-12 bg-gray-200 w-16 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- bios -->
      <p class="h-4 bg-gray-200 rounded-lg w-full max-w-[400px] mt-4" />
    </div>
  </div>
</template>
