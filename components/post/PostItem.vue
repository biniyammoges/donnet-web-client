<template>
  <div class="rounded-xl bg-white px-4 py-3 mb-3 border-[0.3px]">
    <div class="flex justify-between items-center">
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
            v-if="post.creator?.isOnline"
            class="h-2 w-2 top-0 right-0 absolute rounded-full bg-green-400"
          ></span>
        </nuxt-link>
        <div class="flex flex-col justify-center">
          <nuxt-link
            to="/profile"
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
      <button class="text-gray-400 hover:text-gray-600 px-2 text-3xl">
        <span class="i-mdi-dots-horizontal"></span>
      </button>
    </div>

    <!-- Image -->
    <template v-if="post.medias?.length">
      <div
        class="cursor-pointer max-h-[400px] overflow-hidden border-[0.3px] gap-x-1 flex rounded-xl mt-3"
      >
        <img
          class="flex-1 w-1/2 rounded-xl object-cover"
          :src="post.medias[0].file?.url"
          alt=""
        />
        <img
          v-if="post.medias?.length === 2"
          class="w-1/2 rounded-xl object-cover"
          :src="post.medias[1].file?.url"
        />
        <div
          class="w-1/2 flex flex-col gap-y-1"
          v-if="post.medias?.length! > 2"
        >
          <img
            class="w-full h-1/2 rounded-xl object-cover"
            :src="post.medias[2].file?.url"
            alt=""
          />
          <div class="relative w-full h-1/2 overflow-hidden rounded-xl">
            <img
              class="w-full h-full rounded-xl object-cover"
              :src="post.medias[3].file?.url"
              alt=""
            />
            <div
              v-if="post.medias?.length! > 3"
              class="text-white flex items-center justify-center absolute h-full w-full left-0 top-0 bg-[rgba(0,0,0,0.6)]"
            >
              <p class="text-3xl">+{{ post.medias?.length! - 3 }}</p>
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
        class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
      >
        <span class="i-mdi-comment-outline text-xl"></span
        ><span>{{ post.commentCount }}</span>
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
import { PostEntity } from "types";
import { PropType } from "vue";

const { likePost } = usePostStore();
const { likePost: callLikeApi } = usePostApi();

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
</script>

<style scoped>
.creator {
  @apply flex items-center justify-start;
}
</style>
