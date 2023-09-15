import { ChatRoomEntity, FilterQuery, Paginate } from "types"
import useAxios from './useAxios'

export const useChatApi = () => {
     const fetchChatRooms = async (filter: FilterQuery = { page: 1, limit: 200 }) => {
          const resp = await useAxios<Paginate<ChatRoomEntity>>(`api/chat/room/retrieve/?${transformObjectToQuery(filter)}`)
          return resp
     }

     const fetchChats = async (roomId: string, filter: FilterQuery = { page: 1, limit: 200 }) => {
          const resp = await useAxios<Paginate<ChatRoomEntity>>(`api/chat/room/${roomId}/retrieve-chats/?${transformObjectToQuery(filter)}`)
          return resp
     }

     return { fetchChatRooms, fetchChats }
}