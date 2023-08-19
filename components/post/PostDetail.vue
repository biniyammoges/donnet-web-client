<template>
  <BaseModal v-model="showPreviewPostModal" persistant>
    <div
      class="relative w-full md:w-auto bg-white rounded-xl md:max-h-[700px] overflow-y-auto md:overflow-hidden overflow-x-hidden h-full flex flex-col md:flex-row gap-3"
    >
      <div
        v-if="post?.medias?.length"
        class="md:w-[700px] h-[450px] md:h-auto shrink-0 md:shrink overflow-hidden rounded-lg bg-black relative flex items-center justify-center"
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

      <!-- Post detail section -->
      <div class="relative py-2 pl-4 md:w-[440px] h-full">
        <div v-if="post" class="flex justify-between items-center py-2">
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
                    post.creator?.firstName,
                    post.creator?.lastName
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
                {{ dateToTimeAgo(new Date(post?.createdAt)) }}
              </p>
            </div>
          </div>
          <div class="flex gap-x-1">
            <button class="text-gray-400 hover:text-gray-600 px-2 text-3xl">
              <span class="i-mdi-dots-horizontal"></span>
            </button>
            <button
              @click="postModal.closePreviewPostModal"
              class="fixed top-2 right-2 md:static text-gray-400 hover:text-gray-600 px-2 text-3xl"
            >
              <span class="i-mdi-close"></span>
            </button>
          </div>
        </div>

        <div class="relative md:overflow-y-auto h-full">
          <!-- Captions -->
          <p v-if="post?.caption" class="text-gray-500">
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
          <div class="h-[1px] w-full bg-gray-200 mt-2"></div>

          <!-- comments -->
          <div class="mt-2">
            <div
              v-if="commentLoading && !post?.comments?.length"
              class="flex items-center justify-center flex-col"
            >
              <img class="w-9" src="~/assets/images/loader.svg" alt="" />
              <h1 class="text-gray-400">Loading comments..</h1>
            </div>
            <CommentItem
              @on-reply="onReply"
              v-for="comment of post?.comments ?? []"
              :key="comment.id"
              :comment="comment"
            />
            <div
              v-if="!commentLoading && !post?.comments?.length"
              class="flex flex-col items-center justify-center"
            >
              <h1 class="text-gray-500 text-lg flex items-center gap-x-1">
                <span class="i-mdi-smiley-cry-outline text-xl"></span> No
                comments so far!
              </h1>
              <p class="text-sm text-gray-400">be the first one to comment!</p>
              <base-button variant="primaryRevert">
                <span class="i-mdi-reload mr-1"></span>
                Reload</base-button
              >
            </div>
            <div class="h-28"></div>
          </div>
        </div>

        <!-- Add comment input -->
        <div class="fixed md:absolute left-2 bottom-0 right-2 overflow-hidden">
          <button
            class="absolute bottom-[19px] text-xl left-3 h-5 text-gray-500 hover:text-gray-600"
          >
            <span class="i-mdi-emoji-outline"></span>
          </button>
          <textarea
            data-autoresize
            @input="handleTextAreaHeight"
            ref="textAreaRef"
            rows="1"
            class="bg-[#F0F2F5] text-sm resize-none w-full py-3 text-gray-600 max-h-[100px] min-h-[45px] outline-none transition-all px-9 border border-white rounded-lg focus:border focus:border-blue-600 placeholder:text-gray-500"
            :placeholder="`Write comment here...`"
            v-model="commentDto.text"
          ></textarea>

          <button
            @click="comment"
            class="absolute bottom-4 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white right-2 h-7 w-7 items-center justify-center flex"
          >
            <span class="i-mdi-send"></span>
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CommentReplyEventDto, CreateCommentDto } from "types";
import { useModalStore, usePostStore } from "~/store";

const postModal = useModalStore();
const { likePost, updateCommentCount, setComments } = usePostStore();
const { likePost: callLikeApi, createComment, fetchComments } = usePostApi();

// states
const { showPreviewPostModal, selectedPost: post } = storeToRefs(postModal);
const commentDto = reactive<CreateCommentDto>({
  text: "",
  parentCommentId: "",
  postId: "",
});
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const hasPostManyImages = computed(() => post.value?.medias?.length! > 1);
const commentLoading = ref(false);

// Handles textarea height as user enter the text
const handleTextAreaHeight = (e: Event) => {
  const scrollHeight = textAreaRef.value?.scrollHeight ?? 0;
  textAreaRef.value!.style.height = "auto";
  textAreaRef.value!.style.height = scrollHeight + "px";
};

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

const comment = async () => {
  const { data, error } = await createComment({
    ...commentDto,
    ...(!commentDto.parentCommentId && { postId: post.value?.id }),
  });

  if (data.value) {
    if (commentDto.parentCommentId) {
      postModal.addReply(commentDto.parentCommentId, data.value);
    } else {
      updateCommentCount(post.value?.id!);
      post.value!.commentCount! += 1;
      post.value!.comments?.push(data.value);
    }
  }

  // if there is no error which means request is successfull so inputs get creared
  if (!error.value) {
    commentDto.text = "";
    commentDto.parentCommentId = "";
  }
};

watchEffect(async () => {
  if (showPreviewPostModal.value && post.value?.id) {
    commentLoading.value = true;
    const { data, error, pending } = await fetchComments(post.value?.id!);
    commentLoading.value = false;

    if (data.value) {
      setComments(post.value.id, data.value.data);
      post.value.comments = data.value.data;
    }
  }
});

const onReply = async (e: CommentReplyEventDto) => {
  commentDto.parentCommentId = e.commentId;
  textAreaRef.value?.focus();

  const words = commentDto.text.split(" ");
  const hasAtChar = commentDto.text.startsWith("@");
  words.splice(0, hasAtChar ? 1 : 0, `@${e.username}`);
  commentDto.text = words.join(" ");
};
</script>

<style scoped>
.creator {
  @apply flex items-center;
}
</style>
