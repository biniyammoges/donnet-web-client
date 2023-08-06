<template>
  <BaseModal v-model="showPreviewPostModal">
    <div class="bg-white rounded-lg p-4 w-[500px]">
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
        <button class="text-gray-400 hover:text-gray-600 px-2 text-3xl">
          <span class="i-mdi-dots-horizontal"></span>
        </button>
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
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const emits = defineEmits([""]);

const postModal = useModalStore();
const { showPreviewPostModal, selectedPost: post } = storeToRefs(postModal);
const { likePost } = usePostStore();
const { likePost: callLikeApi } = usePostApi();
const like = async () => {
  // calls api for like
  await callLikeApi(post.value?.id!, post.value?.liked);
  // update liked post from store
  likePost(post.value?.id!, post.value?.liked);
};
</script>

<style scoped>
.creator {
  @apply flex items-center;
}
</style>
