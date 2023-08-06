import { defineStore } from "pinia";
import { PostEntity } from "types";

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

     return {
          // create post modals
          createPostModal,
          showCreatePostModal,
          openCreatePostModal,
          closeCreatePostModal,

          // preview postmodal
          selectedPost,
          showPreviewPostModal,
          openPreviewPostModal,
          closePreviewPostModal
     }
})