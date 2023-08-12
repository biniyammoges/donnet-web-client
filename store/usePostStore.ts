import { defineStore } from "pinia";
import { CommentEntity, Paginate } from "types";
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
                    liked: !unlike,
                    likeCount:
                         unlike ? posts.value[idx].likeCount! - 1 : posts.value[idx].likeCount! + 1
               }
          }
     }

     const updateCommentCount = (postId: string, add = true) => {
          const idx = posts.value.findIndex(p => p.id === postId);
          if (idx > -1) {
               posts.value[idx] = {
                    ...posts.value[idx],
                    commentCount:
                         add ? posts.value[idx].commentCount! + 1 : posts.value[idx].commentCount! - 1
               }
          }
     }

     const setComments = (postId: string, comments: CommentEntity[]) => {
          const idx = posts.value.findIndex(p => p.id === postId);
          if (idx > -1) {
               posts.value[idx] = {
                    ...posts.value[idx],
                    comments
               }
          }
     }


     return { posts, getPosts, addPost, setPosts, likePost, updateCommentCount, setComments, }
})