import { defineStore } from "pinia";

export const useModalStore = defineStore('modal-store', () => {
     // states
     const createPostModal = ref<boolean>(false);

     // Getters
     const showCreatePostModal = computed(() => createPostModal.value)

     // actions
     const openCreatePostModal = () => createPostModal.value = true
     const closeCreatePostModal = () => createPostModal.value = false

     return {
          createPostModal,
          showCreatePostModal,
          openCreatePostModal,
          closeCreatePostModal
     }
})