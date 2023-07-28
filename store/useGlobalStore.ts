import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global-store', () => {
     // states
     const createPostModal = ref<boolean>(false);

     // Getters
     const showCreatePostModal = computed(() => createPostModal.value)

     // actions
     const toggleCreatePostModal = () => {
          createPostModal.value = !createPostModal.value
     }

     return { createPostModal, showCreatePostModal, toggleCreatePostModal }
})