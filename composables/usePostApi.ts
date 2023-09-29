import { CommentEntity, CreateCommentDto, CreatePostDto, FilterQuery, Paginate, PostEntity, PostLikeEntity, SavedPostEntity } from 'types'
import useAxios from '~/composables/useAxios'

export default function usePostApi() {
     const createPost = async (body: CreatePostDto) => {
          const resp = await useAxios<PostEntity>('api/post/create', { body, method: 'POST' })
          return resp
     }

     const fetchPosts = async (filter: FilterQuery & { username?: string } = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<PostEntity>>(`api/post/retrieve/feed?${transformObjectToQuery(filter)}`)
          return resp
     }

     const fetchOnePost = async (id: string) => {
          const resp = await useAxios<PostEntity>(`api/post/retrieve/${id}`)
          return resp
     }

     const likePost = async (postId: string, unlike = false) => {
          const resp = await useAxios<PostLikeEntity>(`api/post/${postId}/like?${unlike ? 'unlike=true' : ''}`)
          return resp
     }

     const createComment = async (body: CreateCommentDto) => {
          const resp = await useAxios<CommentEntity>('api/comment/create', { body, method: 'POST' })
          return resp
     }

     const fetchComments = async (postId: string, filter: FilterQuery = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<CommentEntity>>(`api/post/${postId}/comments?${transformObjectToQuery(filter)}`)
          return resp
     }

     const fetchReplies = async (commentId: string, filter: FilterQuery = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<CommentEntity>>(`api/comment/${commentId}/replies?${transformObjectToQuery(filter)}`)
          return resp
     }

     const likeComment = async (commentId: string, unlike = false) => {
          const resp = await useAxios<Comment>(`api/comment/${commentId}/like?${unlike ? 'unlike=true' : ''}`)
          return resp
     }

     const savePost = async (postId: string, unsave = false) => {
          const resp = await useAxios<Comment>(`api/post/${postId}/save?${unsave ? 'unsave=true' : ''}`)
          return resp
     }

     const fetchSavedPosts = async () => {
          const resp = await useAxios<SavedPostEntity[]>(`api/post/retrieve/saved`)
          return resp
     }

     return { createPost, fetchPosts, fetchOnePost, likePost, createComment, fetchComments, likeComment, fetchReplies, savePost, fetchSavedPosts }
};