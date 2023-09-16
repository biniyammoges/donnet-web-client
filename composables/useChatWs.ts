import { ChatRoomIdDto, CreateChatDto, JoinChatRoomDto, TypingDto } from "types"

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

     const emitTypingEvent = async (data: TypingDto) => {
          return $socketIo.emit(ChatSocketEvents.Typing, data);
     };

     const emitTypingStoppedEvent = async (data: TypingDto) => {
          return $socketIo.emit(ChatSocketEvents.StoppedTyping, data);
     };

     return {
          emitSendMessageEvent,
          emitMessageSeenEvent,
          joinChatRoom,
          leaveChatRoom,
          emitTypingEvent,
          emitTypingStoppedEvent
     }
}