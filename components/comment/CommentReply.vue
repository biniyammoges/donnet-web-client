<template>
  <div class="flex items-start pt-2">
    <!-- Commentor Profile Detail -->
    <div class="flex items-center">
      <nuxt-link
        :to="`/u/${reply?.commentor?.username}`"
        class="avatar shrink-0 mr-1 block relative h-8 w-8 rounded-full"
      >
        <img
          v-if="reply?.commentor?.avatar"
          :src="reply.commentor.avatar.url"
          alt="image"
          class="h-7 w-7 rounded-full object-cover"
        />
        <div
          v-else
          class="w-7 h-7 text-sm rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
        >
          {{
            joinFirstCharacters(
              reply?.commentor?.firstName,
              reply?.commentor?.lastName
            )
          }}
        </div>
      </nuxt-link>
    </div>

    <div>
      <!-- Commentor name and date the comment created -->
      <div class="flex items-center gap-x-2">
        <nuxt-link
          :to="`/u/${comment?.commentor?.username}`"
          class="text-gray-600 hover:underline text-base"
          >{{
            reply?.commentor?.firstName + " " + reply?.commentor?.lastName
          }}</nuxt-link
        >
        <span class="text-xs text-gray-400">{{
          dateToTimeAgo(new Date(reply?.createdAt))
        }}</span>
      </div>

      <!-- Reply text -->
      <p class="text-gray-500 pr-5">
        {{ reply?.text }}
      </p>

      <!-- Replies Actions -->
      <div class="flex items-center gap-x-3">
        <button
          @click="likeComment"
          class="flex items-center text-sm py-[7px] gap-x-[5px]"
        >
          <span
            :class="[reply?.liked ? 'i-mdi-heart ' : 'i-mdi-heart-outline']"
            class="text-xl text-blue-600"
          ></span>
          <span class="text-gray-500" v-if="reply?.likeCount"
            >{{ reply?.likeCount }} likes</span
          >
        </button>

        <button
          @click="
            emit('on-reply', {
              username: reply?.commentor?.username,
              commentId: reply?.parentCommentId,
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
import { PropType } from "vue";
import { CommentEntity, CommentReplyEvent } from "~/types";

// states

const props = defineProps({
  reply: {
    type: Object as PropType<CommentEntity>,
    required: true,
  },
});

const emit = defineEmits<CommentReplyEvent>();

const { likeComment: likeReplyApi } = usePostApi();
const { likeReply: updateReplyLikeCountOnStore } = useModalStore();

const likeComment = async () => {
  updateReplyLikeCountOnStore(
    props.reply?.parentCommentId!,
    props.reply.id!,
    props.reply.liked
  );
  await likeReplyApi(props.reply?.id!, props.reply?.liked);
};
</script>
