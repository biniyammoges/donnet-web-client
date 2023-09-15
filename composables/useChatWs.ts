import { ChatRoomIdDto, CreateChatDto } from "types"

export const useChatWs = () => {
     const { $socketIo } = useNuxtApp()

     const emitSendMessageEvent = async (data: CreateChatDto) => {
          return $socketIo.emit(ChatSocketEvents.SendMessage, data)
     }

     const emitMessageSeenEvent = async (data: ChatRoomIdDto) => {
          return $socketIo.emit(ChatSocketEvents.Seen, data)
     }

     return { emitSendMessageEvent, emitMessageSeenEvent }
}