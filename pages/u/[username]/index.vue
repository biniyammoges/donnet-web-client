<template>
  <div class="w-full p-5">
    <div class="flex gap-x-7">
      <div class="relative shrink-0 avatar w-20 h-20 rounded-full">
        <img
          v-if="user?.avatar"
          :src="user.avatar.url"
          alt="image"
          class="h-full w-full rounded-full object-cover"
        />
        <div
          v-else
          class="w-full h-full rounded-full border text-gray-500 border-gray-500 text-2xl flex items-center justify-center"
        >
          {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
        </div>

        <button
          class="absolute bottom-0 right-0 bg-yellow-300 flex items-center justify-center text-gray-900 w-6 h-6 rounded-full border border-yellow-500"
        >
          <span class="i-mdi-camera"> </span>
        </button>
      </div>

      <!-- user detail -->
      <div>
        <div>
          <div class="flex items-center gap-x-6">
            <div>
              <h1 class="text-xl text-gray-700">
                {{ user?.firstName + " " + user?.lastName }}
              </h1>
              <h3 class="text-gray-600 text-lg">{{ user?.email }}</h3>
              <h4 class="text-base text-gray-500">@{{ user?.username }}</h4>
            </div>
            <BaseButton
              @click="showEditProfileModal = true"
              size="small"
              class="self-auto"
              ><span class="i-mdi-edit-box-outline mr-1"></span> Edit
            </BaseButton>

            <!-- Edit Profile Modal -->
            <BaseModal v-model="showEditProfileModal">
              <ProfileEditForm />
            </BaseModal>
          </div>

          <div class="mt-5">
            <div class="flex gap-x-8">
              <!-- Followers -->
              <div>
                <h1
                  @click="showFollowerModal = true"
                  class="leading-6 text-xl font-bold text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"
                >
                  14.2k
                </h1>
                <p class="text-sm text-gray-600">Followers</p>
              </div>

              <!-- Followings -->
              <div>
                <h1
                  class="leading-6 text-xl font-bold text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"
                >
                  1.2k
                </h1>
                <p class="text-sm text-gray-600">Followings</p>
              </div>

              <!-- Posts -->
              <div>
                <h1 class="leading-6 text-xl font-bold text-gray-500">192</h1>
                <p class="text-sm text-gray-600">Posts</p>
              </div>
            </div>
          </div>

          <!-- follower modal -->
          <BaseModal v-model="showFollowerModal">
            <FollowerModal />
          </BaseModal>
        </div>
        <!-- bios -->
        <p class="text-gray-500 max-w-[400px] mt-4">
          I am positive person, I love to travel and eat, and I love sleep as
          well alpha programmer and gammer
        </p>
      </div>
    </div>

    <!-- main -->
    <div class="mt-7 bg-white p-4 rounded-3xl h-screen">
      <BaseTab :tabs="['92 Posts', '12 Saved']">
        <template #tab-1>
          <ProfilePostsTabView />
        </template>
        <template #tab-2>
          <h1>Saved</h1>
        </template>
      </BaseTab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// states
const { user } = storeToRefs(useAuthStore());
const showFollowerModal = ref(false);
const showEditProfileModal = ref(false);
</script>
