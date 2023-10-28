import useAxios from './useAxios'
import { Paginate, StoryEntity, } from 'types'

export default function useStoryApi() {
     const retrieveStories = async () => {
          const resp = await useAxios<Paginate<StoryEntity>>(`api/story/retrieve?limit=100&page=1`)
          return resp
     }


     return { retrieveStories }
};