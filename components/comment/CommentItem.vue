<template>
  <div class="flex py-2">
    <!-- Commentor Profile Detail -->
    <nuxt-link
      to="/"
      class="avatar mr-1 block relative h-8 w-8 rounded-full shrink-0"
    >
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
        v-if="comment?.commentor?.isOnline"
        class="h-2 w-2 top-0 right-1 absolute rounded-full bg-green-500"
      ></span>
    </nuxt-link>

    <div>
      <!-- Commentor name and date the comment created -->
      <div class="flex items-center gap-x-2">
        <nuxt-link to="/profile" class="text-gray-600 hover:underline">{{
          comment?.commentor?.firstName + " " + comment?.commentor?.lastName
        }}</nuxt-link>
        <span class="text-xs text-gray-400">{{
          dateToTimeAgo(new Date(comment?.createdAt!))
        }}</span>
      </div>

      <!-- Comment text -->
      <p class="text-gray-500 py-1 pr-5">
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
          class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-gray-700"
        >
          <span class="i-mdi-comment-outline text-lg"></span
          ><span>{{ comment?.replyCount }} replies</span>
        </button>

        <button
          @click="
            emits('on-reply', {
              commentId: comment?.id,
              username: comment?.commentor?.username,
            })
          "
          class="flex items-center text-sm py-1 gap-x-[5px] text-gray-500 hover:text-blue-700"
        >
          <span class="i-mdi-reply-outline text-xl"></span><span> reply</span>
        </button>
      </div>

      <div class="flex items-center gap-x-2" v-if="comment?.replyCount">
        <div class="h-[1px] bg-gray-400 w-3"></div>
        <button
          @click="toggleReply"
          class="text-gray-500 text-sm hover:text-gray-800"
        >
          {{ showReplies ? "Hide" : "Show" }} replies
        </button>
        <div class="h-[1px] bg-gray-400 w-3"></div>
      </div>

      <!-- Replies -->
      <div v-if="showReplies">
        <CommentReply
          v-for="reply of comment?.replies"
          :key="reply.id"
          @on-reply.self="(e) => emits('on-reply', e)"
          :reply="reply"
        />
        <div class="flex items-center gap-x-2" v-if="comment?.replyCount">
          <div class="h-[1px] bg-gray-400 w-3"></div>
          <button
            @click="toggleReply"
            class="text-gray-500 text-sm hover:text-gray-800"
          >
            {{ showReplies ? "Hide" : "Show" }} replies
          </button>
          <div class="h-[1px] bg-gray-400 w-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { CommentEntity, CommentReplyEvent } from "~/types";

// states
const showReplies = ref(false);

const props = defineProps({
  comment: {
    type: Object as PropType<CommentEntity>,
    required: true,
  },
});

const emits = defineEmits<CommentReplyEvent>();

const { likeComment: callLikeCommentApi, fetchReplies } = usePostApi();
const { likeComment: updateCommentModalState } = useModalStore();

const likeComment = async () => {
  const { data } = await callLikeCommentApi(
    props.comment?.id!,
    props.comment?.liked
  );
  updateCommentModalState(props.comment?.id!, props.comment.liked);
};

const toggleReply = async () => {
  if (!showReplies.value) {
    const res = await fetchReplies(props.comment?.id!);
    if (res.data.value?.data) {
      props.comment.replies = res.data.value?.data ?? [];
    }
  }

  showReplies.value = !showReplies.value;
};
</script>
