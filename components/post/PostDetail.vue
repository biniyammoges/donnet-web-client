<template>
  <BaseModal v-model="showPreviewPostModal">
    <div
      class="relative bg-white rounded-3xl max-h-[700px] overflow-y-hidden overflow-x-hidden h-full px-3 py-3 flex gap-x-3"
    >
      <div
        v-if="post?.medias?.length"
        class="w-[700px] overflow-hidden rounded-lg bg-black relative flex items-center justify-center"
      >
        <button
          v-if="hasPostManyImages"
          @click="backward"
          class="bg-gray-400 absolute left-2 h-8 w-8 rounded-full flex items-center justify-center text-4xl text-white bg-opacity-10"
        >
          <span class="i-mdi-chevron-left"></span>
        </button>
        <button
          v-if="hasPostManyImages"
          @click="forward"
          class="bg-gray-400 absolute right-2 h-8 w-8 rounded-full flex items-center justify-center text-4xl text-white bg-opacity-10"
        >
          <span class="i-mdi-chevron-right"></span>
        </button>
        <img
          :src="post.medias[activeImageIndex].file?.url"
          alt="image"
          class="object-contain w-full h-full"
        />
      </div>

      <div class="relative py-2 pl-2 w-[430px] h-full overflow-y-scroll">
        <div v-if="post" class="flex justify-between items-center">
          <!-- Creator -->
          <div class="creator">
            <nuxt-link
              to="/"
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
                    post.creator?.firstName!,
                    post.creator?.lastName!
                  )
                }}
              </div>
              <span
                class="h-2 w-2 top-1 -right-1 absolute rounded-full bg-green-500"
              ></span>
            </nuxt-link>
            <div class="flex flex-col justify-center">
              <nuxt-link
                to="/profile"
                class="text-gray-500 leading-4 hover:underline"
                >{{
                  post.creator?.firstName + " " + post.creator?.lastName
                }}</nuxt-link
              >
              <p class="text-gray-400 text-xs leading-5">
                {{ dateToTimeAgo(new Date(post.createdAt!)) }}
              </p>
            </div>
          </div>
          <div class="flex gap-x-1">
            <button class="text-gray-400 hover:text-gray-600 px-2 text-3xl">
              <span class="i-mdi-dots-horizontal"></span>
            </button>
            <button
              @click="postModal.closePreviewPostModal"
              class="text-gray-400 hover:text-gray-600 px-2 text-3xl"
            >
              <span class="i-mdi-close"></span>
            </button>
          </div>
        </div>

        <!-- Captions -->
        <p v-if="post?.caption" class="mt-3 text-gray-600">
          {{ post.caption }}
        </p>

        <!-- Actions -->
        <div class="flex items-center mt-1 gap-x-3">
          <button
            @click="like"
            class="flex items-center text-sm py-[7px] gap-x-[5px]"
          >
            <span
              :class="[post?.liked ? 'i-mdi-heart ' : 'i-mdi-heart-outline']"
              class="text-2xl text-blue-600"
            ></span>
            <span class="text-gray-500" v-if="post?.likeCount">{{
              post?.likeCount
            }}</span>
          </button>
          <button
            class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
          >
            <span class="i-mdi-comment-outline text-xl"></span
            ><span>{{ post?.commentCount }} comments</span>
          </button>
        </div>

        <!-- divider -->
        <div class="h-[1px] w-full bg-gray-200 mt-3"></div>

        <!-- comments -->
        <div class="mt-2">
          <CommentItem
            v-for="comment of comments"
            :key="comment"
            :post="post!"
          />
        </div>

        <!-- Add comment input -->
        <div
          class="absolute left-0 bottom-0 right-0 h-10 overflow-hidden rounded-full"
        >
          <input
            placeholder="Write something about biniyam"
            class="h-full border-[0.6px] border-gray-400 rounded-full pr-5 pl-10 w-full text-sm"
          />
          <button
            class="absolute top-1/2 -translate-y-1/2 text-xl left-3 h-5 text-gray-400 hover:text-gray-600"
          >
            <span class="i-mdi-emoji-outline"></span>
          </button>
          <button
            class="absolute top-1/2 -translate-y-1/2 text-sm px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white right-1 h-8"
          >
            comment
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const postModal = useModalStore();
const { likePost } = usePostStore();
const { likePost: callLikeApi } = usePostApi();
const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// states
const { showPreviewPostModal, selectedPost: post } = storeToRefs(postModal);
const hasPostManyImages = computed(() => post.value?.medias?.length! > 0);

const emits = defineEmits(["close"]);

const like = async () => {
  if (post.value) {
    // calls api for like
    await callLikeApi(post.value.id!, post.value.liked);
    // update liked post from store
    likePost(post.value.id!, post.value.liked);

    // updates selected post on store
    if (post.value.liked) {
      post.value.likeCount! -= 1;
    } else {
      post.value.likeCount! += 1;
    }
    post.value.liked = !post.value.liked;
  }
};

// image preview states
const activeImageIndex = ref(0);

// preview next image
const forward = () => {
  if (activeImageIndex.value < post.value?.medias?.length!) {
    activeImageIndex.value += 1;
  } else {
    activeImageIndex.value = 0;
  }
};

// preview previous image
const backward = () => {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value -= 1;
  } else {
    activeImageIndex.value = post.value?.medias?.length!;
  }
};
</script>

<style scoped>
.creator {
  @apply flex items-center;
}
</style>
