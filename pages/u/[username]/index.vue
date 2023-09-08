<template>
  <div class="w-full p-5">
    <!-- user detail -->
    <ProfileUserSkeleton v-if="userLoading" />
    <div v-else class="flex gap-x-7">
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
          v-if="avatarPreview || foundUser?.avatar"
          :src="avatarPreview || foundUser?.avatar?.url"
          alt="image"
          class="h-full w-full rounded-full object-cover"
        />
        <div
          v-else
          class="w-full h-full rounded-full text-yellow-800 text-2xl flex items-center justify-center"
        >
          {{
            joinFirstCharacters(
              foundUser?.firstName ?? "",
              foundUser?.lastName ?? ""
            )
          }}
        </div>

        <!-- avatar upload button -->
        <div
          class="absolute bottom-0 right-0"
          v-if="user?.username === username"
        >
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
                {{ foundUser?.firstName + " " + foundUser?.lastName }}
              </h1>
              <h3 class="text-gray-600 text-lg">{{ foundUser?.email }}</h3>
              <h4 class="text-base text-gray-500">
                @{{ foundUser?.username }}
              </h4>
            </div>
            <div class="flex items-center gap-x-2">
              <BaseButton
                v-if="user?.username === username"
                @click="showEditProfileModal = true"
                size="small"
                class="self-auto"
                ><span class="i-mdi-edit-box-outline mr-1"></span> Edit
              </BaseButton>
              <BaseButton v-else size="small" class="self-auto">
                Follow
              </BaseButton>
            </div>

            <!-- Edit Profile Modal -->
            <BaseModal
              v-if="user?.username === username"
              v-model="showEditProfileModal"
            >
              <ProfileEditForm />
            </BaseModal>
          </div>

          <div class="mt-5">
            <div class="flex gap-x-8">
              <!-- Followers -->
              <div class="text-center">
                <h1
                  @click="showFollowerModal = true"
                  class="leading-6 text-xl font-bold text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"
                >
                  {{ foundUser?.followerCount ?? 0 }}
                </h1>
                <p class="text-sm text-gray-600">Followers</p>
              </div>

              <!-- Followings -->
              <div class="text-center">
                <h1
                  class="leading-6 text-xl font-bold text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"
                >
                  {{ foundUser?.followingCount ?? 0 }}
                </h1>
                <p class="text-sm text-gray-600">Followings</p>
              </div>

              <!-- Posts -->
              <div class="text-center">
                <h1 class="leading-6 text-xl font-bold text-gray-500">
                  {{ foundUser?.postCount ?? 0 }}
                </h1>
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
        <p v-if="foundUser?.bio" class="text-gray-500 max-w-[400px] mt-4">
          {{ foundUser?.bio }}
        </p>
      </div>
    </div>

    <!-- main -->
    <div class="mt-7 bg-white p-4 rounded-3xl h-screen">
      <BaseTab :tabs="[`${foundUser?.postCount ?? 0} Posts`, `12 Saved`]">
        <template #tab-1>
          <ProfilePostsTabView :posts="posts" />
        </template>
        <template v-if="user?.username === username" #tab-2>
          <h1>Saved</h1>
        </template>
      </BaseTab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PostEntity, User } from "types";

// states
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const showFollowerModal = ref(false);
const showEditProfileModal = ref(false);
const avatarPreview = ref("");
const uploading = ref(false);

const foundUser = ref<User>();
const posts = ref<PostEntity[]>([]);
const username = ref("");

const userLoading = ref(true);
const postLoading = ref(false);

// composables
const { uploadFile } = useFileApi();
const { uploadUserAvatar, findByUsername } = useUserApi();
const { fetchPosts } = usePostApi();
const route = useRoute();
const router = useRouter();

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
    await uploadUserAvatar(data.value?.id!);
    avatarPreview.value = "";
  }

  uploading.value = false;
};

const callPostApi = async () => {
  postLoading.value = true;
  const { data } = await fetchPosts({ username: username.value });
  postLoading.value = false;

  if (data.value?.data) {
    posts.value = data.value?.data;
  }
};

const callUserApi = async () => {
  userLoading.value = true;
  const { data, error } = await findByUsername(username.value);
  userLoading.value = false;

  if (
    error.value?.data &&
    error.value?.data?.message === `No user with username ${username.value}`
  ) {
    router.push("/page-not-found");
  }

  if (data.value) {
    foundUser.value = data.value;
  }
};

onMounted(async () => {
  username.value = (route.params?.username as string) ?? "";

  await nextTick();
  await Promise.all([callPostApi(), callUserApi()]);
});
</script>
