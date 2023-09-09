<template>
  <div class="w-full pt-5 px-5 pb-16">
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
              <h1 class="text-2xl text-gray-700">
                {{ foundUser?.firstName + " " + foundUser?.lastName }}
              </h1>
              <h3 class="text-gray-700 text-xl mt-1">{{ foundUser?.email }}</h3>
              <h4 class="text-lg text-gray-700 mt-1">
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
              <div v-else class="flex flex-col items-center gap-y-2">
                <BaseButton
                  :loading="true"
                  @click="manageFollow"
                  :variant="!foundUser?.following ? 'primary' : 'primaryRevert'"
                  size="small"
                  class="self-auto"
                  ><span class="i-mdi-account mr-1"></span>
                  {{ foundUser?.following ? "Unfollow" : "Follow" }}
                </BaseButton>
                <BaseButton
                  variant="warningRevert"
                  size="small"
                  class="self-auto"
                >
                  <span class="i-mdi-comment-outline mr-1"></span> Message
                </BaseButton>
              </div>
            </div>

            <!-- Edit Profile Modal -->
            <BaseModal
              persistant
              v-if="user?.username === username"
              v-model="showEditProfileModal"
            >
              <ProfileEditForm @close="showEditProfileModal = false" />
            </BaseModal>
          </div>

          <div class="mt-3">
            <div class="flex gap-x-5">
              <!-- Followers -->
              <div class="text-center flex">
                <h1
                  @click="
                    foundUser?.followerCount ? openFollowingModal() : null
                  "
                  :class="{ 'hover:underline': foundUser?.followerCount }"
                  class="text-sm text-gray-500 cursor-pointer"
                >
                  <span class="font-bold text-2xl">{{
                    foundUser?.followerCount ?? 0
                  }}</span>
                  Followers
                </h1>
                <!-- <p class="text-sm text-gray-700">Followers</p> -->
              </div>

              <!-- Followings -->
              <div class="text-center">
                <h1
                  @click="
                    foundUser?.followingCount ? openFollowingModal(true) : null
                  "
                  :class="{ 'hover:underline': foundUser?.followingCount }"
                  class="text-sm text-gray-500 cursor-pointer"
                >
                  <span class="font-bold text-2xl">{{
                    foundUser?.followingCount ?? 0
                  }}</span>
                  Followings
                </h1>
              </div>

              <!-- Posts -->
              <div class="text-center">
                <h1 class="text-sm text-gray-500">
                  <span class="font-bold text-2xl">{{
                    foundUser?.postCount ?? 0
                  }}</span>
                  Posts
                </h1>
              </div>
            </div>
          </div>

          <!-- follower modal -->
          <BaseModal v-model="showFollowerModal.show">
            <FollowerModal
              @close="showFollowerModal.show = false"
              :is-following-modal="showFollowerModal.isFollowingModal"
              :user="foundUser"
            />
          </BaseModal>
        </div>
        <!-- bios -->
        <p v-if="foundUser?.bio" class="text-gray-500 max-w-[400px] mt-4">
          {{ foundUser?.bio }}
        </p>
      </div>
    </div>

    <!-- post detail modal -->
    <post-detail"/>

    <!-- main -->
    <div class="mt-5 bg-white p-4 rounded-3xl max-w-6xl">
      <BaseTab :tabs="tabs">
        <template #tab-1>
          <ProfilePostsTabView :posts="posts" />
        </template>
        <template v-if="user?.username === username" #tab-2>
          <ProfilePostsTabView :posts="savedPosts" />
        </template>
      </BaseTab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PostEntity, User } from "types";

// states
const { closePreviewPostModal } = useModalStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const showFollowerModal = reactive({ show: false, isFollowingModal: false });
const showEditProfileModal = ref(false);
const avatarPreview = ref("");
const uploading = ref(false);

const foundUser = ref<User>();
const posts = ref<PostEntity[]>([]);
const savedPosts = ref<PostEntity[]>([]);
const username = ref("");

const userLoading = ref(true);
const postLoading = ref(false);

const tabs = computed(() => {
  let tabs = [`${foundUser.value?.postCount ?? 0} Posts`];

  if (username?.value === user.value?.username) {
    tabs.push(`${foundUser.value?.savedPostCount ?? 0} Saved Posts`);
  }

  return tabs;
});

// composables
const openFollowingModal = (isFollowing = false) => {
  showFollowerModal.show = true;
  showFollowerModal.isFollowingModal = isFollowing;
};

const { uploadFile } = useFileApi();
const { uploadUserAvatar, findByUsername } = useUserApi();
const { followUser, unFollowUser } = useFollowerApi();
const { fetchPosts, fetchSavedPosts } = usePostApi();
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

const manageFollow = async () => {
  if (!foundUser.value?.following) {
    const res = await followUser(foundUser.value?.username!);
    foundUser.value!.following = true;
    foundUser.value!.followerCount! += 1;
  } else {
    const res = await unFollowUser(foundUser.value?.username!);
    foundUser.value!.following = false;
    foundUser.value!.followerCount! -= 1;
  }
};

const callPostApi = async () => {
  postLoading.value = true;
  const { data } = await fetchPosts({ username: username.value });
  postLoading.value = false;

  if (data.value?.data) {
    posts.value = data.value?.data;
  }
};

const callSavedPostApi = async () => {
  const { data } = await fetchSavedPosts();
  if (data.value) {
    savedPosts.value = data.value.map((sp) => sp.post!) ?? [];
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

watch(user, () => {
  //  updates foundUser data when user date from store is changed
  if (username.value === user.value?.username) {
    foundUser.value!.firstName = user?.value.firstName;
    foundUser.value!.lastName = user?.value.lastName;
    foundUser.value!.bio = user?.value.bio;
  }
});

onMounted(async () => {
  closePreviewPostModal();
  username.value = (route.params?.username as string) ?? "";

  await nextTick();
  await Promise.all([callPostApi(), callUserApi(), callSavedPostApi()]);
});
</script>
