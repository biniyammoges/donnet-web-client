import { CommentEntity, CreateCommentDto, CreatePostDto, FilterQuery, Paginate, PostEntity } from 'types'
import useAxios from '~/composables/useAxios'

export default function usePostApi() {
     const createPost = async (body: CreatePostDto) => {
          const resp = await useAxios<PostEntity>('api/post/create', { body, method: 'POST' })
          return resp
     }

     const fetchPosts = async (filter: FilterQuery = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<PostEntity>>(`api/post/retrieve/feed?${transformObjectToQuery(filter)}`)
          return resp
     }

     const likePost = async (postId: string, unlike = false) => {
          const resp = await useAxios<Paginate<PostEntity>>(`api/post/${postId}/like?${unlike ? 'unlike=true' : ''}`)
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

     return { createPost, fetchPosts, likePost, createComment, fetchComments }
};