import { ChatRoomIdDto, CreateChatDto, JoinChatRoomDto } from "types"

export const useChatWs = () => {
     const { $socketIo } = useNuxtApp()

     const emitSendMessageEvent = async (data: CreateChatDto) => {
          return $socketIo.emit(ChatSocketEvents.SendMessage, data)
     }

     const emitMessageSeenEvent = async (data: ChatRoomIdDto) => {
          return $socketIo.emit(ChatSocketEvents.Seen, data)
     }

     const joinChatRoom = async (data: JoinChatRoomDto) => {
          return $socketIo.emit(ChatSocketEvents.JoinChatRoom, {
               recipientId: data.recipientId,
          });
     };

     const leaveChatRoom = async (chatRoomId: string) => {
          return $socketIo.emit(ChatSocketEvents.leaveChatRoom, { chatRoomId });
     };

     return { emitSendMessageEvent, emitMessageSeenEvent, joinChatRoom, leaveChatRoom }
}