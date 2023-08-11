<template>
  <div class="flex py-3">
    <!-- Commentor Profile Detail -->
    <nuxt-link to="/" class="avatar mr-1 block relative h-8 w-8 rounded-full">
      <img
        v-if="comment?.commentor?.avatar"
        :src="comment.commentor.avatar.url"
        alt="image"
        class="h-7 w-7 rounded-full object-cover"
      />
      <div
        v-else
        class="w-7 h-7 text-sm rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
      >
        {{
          joinFirstCharacters(
            comment?.commentor?.firstName,
            comment?.commentor?.lastName
          )
        }}
      </div>
      <span
        class="hidden h-2 w-2 top-1 right-1 absolute rounded-full bg-green-500"
      ></span>
    </nuxt-link>

    <div>
      <!-- Commentor name and date the comment created -->
      <div class="flex items-center gap-x-2">
        <nuxt-link
          to="/profile"
          class="text-gray-500 hover:underline text-base"
          >{{
            comment?.commentor?.firstName + " " + comment?.commentor?.lastName
          }}</nuxt-link
        >
        <span class="text-xs text-gray-400">{{
          dateToTimeAgo(new Date(comment?.createdAt!))
        }}</span>
      </div>

      <!-- Comment text -->
      <p class="text-gray-500">
        {{ comment?.text }}
      </p>

      <!-- Comments Actions -->
      <div class="flex items-center gap-x-3">
        <button
          @click="likeComment"
          class="flex items-center text-sm py-[7px] gap-x-[5px]"
        >
          <span
            :class="[comment?.liked ? 'i-mdi-heart ' : 'i-mdi-heart-outline']"
            class="text-xl text-blue-600"
          ></span>
          <span class="text-gray-500" v-if="comment?.likeCount"
            >{{ comment?.likeCount }} likes</span
          >
        </button>

        <button
          @click="
            emit('onReply', {
              username: comment?.commentor?.username,
              parentid: comment?.parentCommentId,
            })
          "
          class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-blue-700"
        >
          <span class="i-mdi-reply-outline text-xl"></span><span> reply</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentEntity } from "~/types";

// states

const props = defineProps({
  comment: CommentEntity,
});

const emit = defineEmits(["onReply"]);

const { likeComment: callLikeCommentApi } = usePostApi();
const { likeComment: updateCommentModalState } = useModalStore();
const { likeComment: updateCommentOnPostStore } = usePostStore();

const likeComment = async () => {
  const { data } = await callLikeCommentApi(
    props.comment?.id!,
    props.comment?.liked
  );
  // updateCommentModalState(props.comment?.id!);
  // updateCommentOnPostStore(props.comment?.postId!, props.comment?.id!);
};
</script>
