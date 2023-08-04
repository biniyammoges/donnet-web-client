import { defineStore } from "pinia";
import { PostEntity } from "types/entities/post/post.entity";

export const usePostStore = defineStore('post-store', () => {
     // states
     const posts = ref<PostEntity[]>([]);

     // getters
     const getPosts = computed(() => posts);

     // actions
     const addPost = (post: Partial<PostEntity>) => posts.value = [post, ...posts.value]
     const setPosts = (payload: PostEntity[]) => posts.value = payload

     return { posts, getPosts, addPost, setPosts }
})