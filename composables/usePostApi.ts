import { CreatePostDto, FilterQuery, Paginate, PostEntity } from 'types'
import useAxios from '~/composables/useAxios'

export default function usePostApi() {
     const createPost = async (body: CreatePostDto) => {
          const resp = await useAxios<PostEntity>('api/post/create', { body, method: 'POST' })
          return resp
     }

     const fetchPosts = async (filter: FilterQuery = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<PostEntity>>(`api/post/retrieve/feed?${transformObjectToQuery(filter)}`)
          return resp.data
     }

     return { createPost, fetchPosts }
};