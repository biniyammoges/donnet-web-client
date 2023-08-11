<template>
  <BaseModal v-model="showPreviewPostModal" persistant>
    <div
      class="relative bg-white rounded-xl max-h-[700px] overflow-y-hidden overflow-x-hidden h-full px-3 py-3 flex gap-x-3"
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

      <!-- Post detail section -->
      <div class="relative pt-2 pb-24 pl-2 w-[430px] h-full">
        <div v-if="post" class="flex justify-between items-center mb-3">
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

        <div class="relative overflow-y-auto h-full">
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
          <div class="h-[1px] w-full bg-gray-200 mt-3"></div>

          <!-- comments -->
          <div class="mt-2">
            <h1
              v-if="commentLoading && !post?.comments?.length"
              class="text-2xl text-gray-500"
            >
              Loading comments
            </h1>
            <CommentItem
              v-for="comment of post?.comments ?? []"
              :key="comment.id"
              :comment="comment"
            />
            <div
              v-if="!post?.comments?.length"
              class="flex flex-col items-center justify-center"
            >
              <h1 class="text-gray-500 text-lg flex items-center gap-x-1">
                <span class="i-mdi-smiley-cry-outline text-xl"></span> No
                comments so far!
              </h1>
              <p class="text-sm text-gray-400">be the first one to comment!</p>
            </div>
          </div>
        </div>

        <!-- Add comment input -->
        <div class="absolute left-0 -bottom-2 right-0 overflow-hidden">
          <button
            class="absolute bottom-[18px] text-xl left-3 h-5 text-gray-400 hover:text-gray-600"
          >
            <span class="i-mdi-emoji-outline"></span>
          </button>
          <textarea
            @input="handleTextAreaHeight"
            ref="textAreaRef"
            class="bg-gray-50 resize-none w-full py-2 text-gray-600 max-h-[100px] outline-none transition-all px-9 border border-gray-300 rounded-lg"
            :placeholder="`Write something about ${post?.creator?.firstName}'s post?`"
            v-model="commentDto.text"
            rows="1"
          ></textarea>

          <button
            @click="comment"
            class="absolute bottom-3 text-sm px-4 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white right-1 h-8"
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
import { CreateCommentDto } from "types";

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
const usernameToReply = ref<string | null>(null);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const hasPostManyImages = computed(() => post.value?.medias?.length! > 1);
const commentLoading = ref(false);

// Handles textarea height as user enter the text
const handleTextAreaHeight = () => {
  const scrollHeight = textAreaRef.value?.scrollHeight;
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
    postId: post.value?.id,
  });
  if (data.value) {
    updateCommentCount(post.value?.id!);
    post.value!.commentCount! += 1;
    post.value!.comments?.push(data.value);
  }

  if (!error.value) {
    commentDto.text = "";
    commentDto.parentCommentId = "";
    usernameToReply.value = "";
  }
};

watchEffect(async () => {
  if (showPreviewPostModal.value && post.value?.id) {
    commentLoading.value = true;
    const { data, error, pending, execute } = await fetchComments(
      post.value?.id!
    );
    commentLoading.value = false;

    if (data.value) {
      setComments(post.value.id, data.value.data);
      post.value.comments = data.value.data;
    }
  }
});
</script>

<style scoped>
.creator {
  @apply flex items-center;
}
</style>
