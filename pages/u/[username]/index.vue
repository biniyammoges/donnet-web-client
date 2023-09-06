<template>
  <div class="w-full p-5">
    <div class="flex gap-x-7">
      <div
        class="relative shrink-0 avatar w-20 h-20 border border-yellow-500 rounded-full"
      >
        <div
          v-if="uploading"
          class="absolute flex items-center justify-center h-full w-full rounded-full z-30 bg-opacity-30 bg-black top-0 left-0"
        >
          <img width="50" src="~/assets/images/spin.svg" alt="spin" />
        </div>
        <img
          v-if="avatarPreview || user?.avatar"
          :src="avatarPreview || user?.avatar?.url"
          alt="image"
          class="h-full w-full rounded-full object-cover"
        />
        <div
          v-else
          class="w-full h-full rounded-full text-yellow-800 text-2xl flex items-center justify-center"
        >
          {{ joinFirstCharacters(user?.firstName ?? "", user?.lastName ?? "") }}
        </div>

        <!-- avatar upload button -->
        <div class="absolute bottom-0 right-0">
          <input
            @change="handleFileInput"
            type="file"
            id="file-input"
            class="hidden"
            accept="image/*"
          />
          <label
            class="cursor-pointer bg-yellow-300 flex items-center justify-center text-gray-900 w-6 h-6 rounded-full border border-yellow-500"
            for="file-input"
            ><span class="i-mdi-camera"></span
          ></label>
        </div>
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
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const showFollowerModal = ref(false);
const showEditProfileModal = ref(false);
const avatarPreview = ref("");
const uploading = ref(false);

// composables
const { uploadFile } = useFileApi();
const { uploadUserAvatae } = useUserApi();

// methods
const handleFileInput = async (e: Event) => {
  const inpt = e.target as HTMLInputElement;
  const file = inpt.files![0];

  const previewUrl = URL.createObjectURL(file);
  avatarPreview.value = previewUrl;

  uploading.value = true;
  const { data } = await uploadFile(file);

  if (data.value) {
    authStore.setAvatar(data.value);
    const { data: userData } = await uploadUserAvatae(data.value?.id!);
    avatarPreview.value = "";
  }

  uploading.value = false;
};
</script>
