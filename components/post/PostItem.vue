<template>
  <div class="rounded-xl bg-white px-4 py-3 mb-3 border-[0.3px]">
    <div class="flex justify-between items-center">
      <!-- Creator -->
      <div class="creator">
        <nuxt-link
          :to="`/u/${post?.creator?.username}`"
          class="avatar mr-3 block relative h-8 w-8 rounded-full"
        >
          <img
            v-if="post?.creator?.avatar"
            :src="post.creator.avatar.url"
            alt="image"
            class="h-8 w-8 rounded-full object-cover"
          />
          <div
            v-else
            class="w-9 h-9 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
          >
            {{
              joinFirstCharacters(
                post.creator?.firstName,
                post.creator?.lastName
              )
            }}
          </div>
          <span
            v-if="post.creator?.isOnline"
            class="h-2 w-2 top-0 right-0 absolute rounded-full bg-green-400"
          ></span>
        </nuxt-link>
        <div class="flex flex-col justify-center">
          <nuxt-link
            :to="`/u/${post?.creator?.username}`"
            class="text-gray-900 leading-5 hover:underline"
            >{{
              post.creator?.firstName + " " + post.creator?.lastName
            }}</nuxt-link
          >
          <p class="text-gray-400 text-sm leading-5">
            {{ dateToTimeAgo(new Date(post.createdAt!)) }}
          </p>
        </div>
      </div>
      <div class="relative shrink-0" ref="menuEl">
        <button
          @click="openMenu"
          class="text-gray-400 hover:text-gray-600 px-2 text-3xl"
        >
          <span class="i-mdi-dots-horizontal"></span>
        </button>

        <!-- menus -->
        <div
          v-if="showMenus"
          class="absolute w-40 h-auto top-full right-0 bg-green-400 shadow-2xl rounded-lg"
        >
          <!-- position indicator -->
          <div
            class="indicator bg-white border h-6 w-6 borders absolute right-2 -top-2 rotate-45"
          ></div>

          <!-- buttons container -->
          <div
            class="z-30 w-40 overflow-hidden rounded-lg borders border absolute h-auto top-0 right-0"
          >
            <!-- <div
              class="absolute w-6 rounded h-[3px] bg-white right-2 -top-[1px]"
            ></div> -->
            <button
              @click="savePost"
              class="flex z-0 flex-nowrap items-center gap-x-2 bg-white hover:bg-blue-50 w-full text-gray-600 hover:text-gray-900 py-1 px-3"
            >
              <span class="i-mdi-bookmark-outline"> </span>
              {{ post.saved ? "Unsave" : "Save" }}
            </button>
            <button
              class="flex flex-nowrap items-center gap-x-2 bg-white text-gray-400 py-1 px-3 w-full"
            >
              <span class="i-mdi-warning-circle-outline"> </span>Report
            </button>
            <button
              v-if="isCreator(post?.creator?.id ?? '')"
              class="flex flex-nowrap items-center gap-x-2 bg-white text-gray-400 py-1 px-3 w-full"
            >
              <span class="i-mdi-edit-box-outline"> </span>Edit
            </button>
            <button
              v-if="isCreator(post?.creator?.id ?? '')"
              class="flex flex-nowrap items-center gap-x-2 bg-white w-full text-red-300 py-1 px-3"
            >
              <span class="i-mdi-trash-can-outline"> </span>Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image -->
    <template v-if="post.medias?.length">
      <div
        @click="openPreviewPostModal(post)"
        class="cursor-pointer max-h-[400px] overflow-hidden border-[0.3px] gap-x-1 flex rounded-xl mt-3"
      >
        <img
          class="flex-1 w-1/2 rounded-xl object-cover"
          :src="post.medias[0]?.file?.url"
          alt=""
        />
        <img
          v-if="post.medias?.length === 2"
          class="w-1/2 rounded-xl object-cover"
          :src="post.medias[1]?.file?.url"
        />
        <div class="w-1/2 flex flex-col gap-y-1" v-if="post.medias?.length > 2">
          <img
            class="w-full h-1/2 rounded-xl object-cover"
            :src="post.medias[1]?.file?.url"
            alt=""
          />
          <div class="relative w-full h-1/2 overflow-hidden rounded-xl">
            <img
              class="w-full h-full rounded-xl object-cover"
              :src="post.medias[2]?.file?.url"
              alt=""
            />
            <div
              v-if="post.medias?.length > 3"
              class="text-white flex items-center justify-center absolute h-full w-full left-0 top-0 bg-[rgba(0,0,0,0.6)]"
            >
              <p class="text-3xl">+{{ post.medias?.length - 3 }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Captions -->
    <p v-if="post.caption" class="mt-3 text-gray-600">
      {{ post.caption }}
    </p>

    <!-- Actions -->
    <div class="flex items-center mt-1 gap-x-3">
      <button
        @click="like"
        class="flex items-center text-sm py-[7px] gap-x-[5px]"
      >
        <span
          :class="[post.liked ? 'i-mdi-heart ' : 'i-mdi-heart-outline']"
          class="text-2xl text-blue-600"
        ></span>
        <span class="text-gray-500" v-if="post.likeCount">{{
          post.likeCount
        }}</span>
      </button>
      <button
        @click="openPreviewPostModal(post)"
        class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
      >
        <span class="i-mdi-comment-outline text-xl"></span
        ><span>{{ post.commentCount }} comments</span>
      </button>
    </div>

    <!-- Add comment input -->
    <div class="hidden relative h-9 overflow-hidden rounded-full mt-3">
      <input
        placeholder="Write something about biniyam"
        class="h-full border-[0.6px] border-gray-400 rounded-full pr-5 pl-10 w-full text-sm"
      />
      <button
        class="absolute top-1/2 -translate-y-1/2 text-xl left-3 h-6 text-gray-400 hover:text-gray-600"
      >
        <span class="i-mdi-emoji-outline"></span>
      </button>
      <button
        class="absolute top-1/2 -translate-y-1/2 text-sm px-4 py-1 rounded-full bg-blue-500 text-white right-2 h-8"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PostEntity } from "types";
import { PropType } from "vue";

const { likePost } = usePostStore();
const authStore = useAuthStore();

const { likePost: callLikeApi, savePost: savePostApi } = usePostApi();
const { openPreviewPostModal } = useModalStore();
const { user } = storeToRefs(authStore);

const showMenus = ref(false);
const menuEl = ref<HTMLDivElement | null>(null);

const isCreator = (creatorId: string) => user.value?.id === creatorId;

const openMenu = () => {
  showMenus.value = true;
};

const closeMenu = (e: any) => {
  e.stopPropagation();

  if (menuEl.value && !menuEl.value.contains(e.target)) {
    showMenus.value = false;
  }
};

const props = defineProps({
  post: {
    type: Object as PropType<PostEntity>,
    required: true,
  },
});

const like = async () => {
  // calls api for like
  await callLikeApi(props.post.id!, props.post.liked);
  // update liked post from store
  likePost(props.post.id!, props.post.liked);
};

const savePost = async () => {
  await savePostApi(props.post?.id!, props.post.saved);
  props.post.saved = !props.post.saved;
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("click", closeMenu);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.addEventListener("click", closeMenu);
  }
});
</script>

<style scoped>
.creator {
  @apply flex items-center justify-start;
}
</style>
