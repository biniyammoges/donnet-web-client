import { defineStore } from "pinia";
import { Paginate, StoryEntity } from "types";

export const useStoryStore = defineStore('story-store', () => {
     // states
     const stories = ref<StoryEntity[]>([]);
     const total = ref<number>(0)

     // actions
     const setStories = (data: Paginate<StoryEntity>) => {
          total.value = data.total
          stories.value = data.data
     }

     return { stories, total, setStories }
})