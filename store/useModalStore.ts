import { defineStore } from "pinia";
import { CommentEntity, PostEntity } from "types";

export const useModalStore = defineStore('post-modal-store', () => {
     // states
     const createPostModal = ref(false);
     const showPreviewPostModal = ref(false)
     const selectedPost = ref<PostEntity | null>(null)

     // Getters
     const showCreatePostModal = computed(() => createPostModal.value)

     // actions
     const openCreatePostModal = () => createPostModal.value = true
     const closeCreatePostModal = () => createPostModal.value = false
     const openPreviewPostModal = (post: PostEntity) => {
          showPreviewPostModal.value = true
          selectedPost.value = post
     }
     const closePreviewPostModal = () => {
          showPreviewPostModal.value = false
          selectedPost.value = null
     }
     const likeComment = (commentId: string, unlike = false) => {
          if (selectedPost.value) {
               const comments = selectedPost.value.comments ?? [];
               const commentIdx = comments.findIndex(c => c.id === commentId);

               if (commentIdx > -1) {
                    comments[commentIdx].liked = !unlike

                    console.log(comments)
                    selectedPost.value = {
                         ...selectedPost.value,
                         comments
                    }
               }
          }

     }


     return {
          // create post modals
          createPostModal,
          showCreatePostModal,
          openCreatePostModal,
          closeCreatePostModal,

          // preview postmodal
          selectedPost,
          likeComment,

          showPreviewPostModal,
          openPreviewPostModal,
          closePreviewPostModal,

     }
})