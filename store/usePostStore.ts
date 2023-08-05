import { defineStore } from "pinia";
import { Paginate } from "types";
import { PostEntity } from "types/entities/post/post.entity";

export const usePostStore = defineStore('post-store', () => {
     // states
     const posts = ref<PostEntity[]>([]);
     const total = ref<number>(0)

     // getters
     const getPosts = computed(() => posts);

     // actions
     const addPost = (post: Partial<PostEntity>) => posts.value = [post, ...posts.value]
     const setPosts = (payload: Paginate<PostEntity>) => {
          posts.value = payload.data
          total.value = payload.total
     }
     const likePost = (postId: string, unlike = false) => {
          const idx = posts.value.findIndex(p => p.id === postId);
          if (idx > -1) {
               posts.value[idx] = {
                    ...posts.value[idx],
                    liked: unlike ? false : true,
                    likeCount:
                         unlike ? posts.value[idx].likeCount! - 1 : posts.value[idx].likeCount! + 1
               }
          }
     }

     return { posts, getPosts, addPost, setPosts, likePost }
})