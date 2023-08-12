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
                    const comment = comments[commentIdx]
                    selectedPost.value.comments![commentIdx] = {
                         ...comment,
                         liked: !unlike,
                         likeCount: unlike ? comment.likeCount! - 1 : comment.likeCount! + 1,
                    }
               }
          }
     }

     /**
      * 
      * @param commentId - parent comment id
      * @param replyId - child comment id whode like count gets update
      * @param unlike - tells if it's liking or unliking, by default false
      */
     const likeReply = (commentId: string, replyId: string, unlike = false) => {
          if (selectedPost.value) {
               const comments = selectedPost.value.comments ?? [];
               const commentIdx = comments.findIndex(c => c.id === commentId);

               if (commentIdx > -1) {
                    const replies = comments[commentIdx].replies;
                    const replyIdx = replies!.findIndex(r => r.id === replyId);

                    if (replyIdx > -1) {
                         const reply = selectedPost.value.comments![commentIdx].replies![replyIdx]
                         selectedPost.value.comments![commentIdx].replies![replyIdx] = { ...reply, liked: !unlike, likeCount: unlike ? reply.likeCount! - 1 : reply.likeCount! + 1 }
                    }
               }
          }
     }

     const addReply = (commentId: string, reply: CommentEntity) => {
          if (selectedPost.value) {
               const comments = selectedPost.value.comments ?? [];
               const commentIdx = comments.findIndex(c => c.id === commentId);

               if (commentIdx > -1) {
                    selectedPost.value.comments![commentIdx].replies = [...(comments[commentIdx].replies ?? []), reply]
                    selectedPost.value.comments![commentIdx].replyCount! += 1
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
          addReply,
          likeReply,

          showPreviewPostModal,
          openPreviewPostModal,
          closePreviewPostModal,
     }
})