import useAxios from './useAxios'
import { FollowerEntity, Paginate, } from 'types'

export default function useFollowerApi() {
     const followUser = async (username: string,) => {
          const resp = await useAxios<FollowerEntity>(`api/follow/${username}`)
          return resp
     }

     const unFollowUser = async (username: string,) => {
          const resp = await useAxios<FollowerEntity>(`api/unfollow/${username}`)
          return resp
     }

     const fetchFollowers = async (username: string,) => {
          const resp = await useAxios<Paginate<FollowerEntity>>(`api/followers/${username}`)
          return resp
     }

     const fetchFollowings = async (username: string,) => {
          const resp = await useAxios<Paginate<FollowerEntity>>(`api/followings/${username}`)
          return resp
     }

     return { followUser, unFollowUser, fetchFollowers, fetchFollowings }
};