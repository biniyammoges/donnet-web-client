import { defineStore } from "pinia";
import { ChatEntity, ChatRoomEntity, TypingDto } from "~/types";

export const useChatStore = defineStore('chat-store', () => {
     const rooms = ref<ChatRoomEntity[]>([]);
     const selectedRoom = ref<ChatRoomEntity | null>(null);

     // computeds
     const unreadMessageCount = computed(() => {
          const counts = rooms.value.reduce<number>((all, cur) => {
               return cur.unreadCount ? all + cur.unreadCount : all
          }, 0)
          return counts
     }
     )
     const hasRecentChats = computed(() => selectedRoom.value?.chats?.length);

     // methods
     const setRooms = (data: ChatRoomEntity[]) => {
          rooms.value = data
     }

     const setSelectedRoom = (room: ChatRoomEntity | null) => {
          selectedRoom.value = room
     }

     const setSelectedRoomsChat = (chats: ChatEntity[]) => {
          if (selectedRoom.value) {
               selectedRoom.value.chats = chats
          }
     }

     const moveRoomToTop = (chatRoom: ChatRoomEntity) => {
          const idx = rooms.value.findIndex((r) => r?.id === chatRoom?.id);

          // if room exist, then it moves the room to top or first order
          if (idx > -1) {
               const room = rooms.value[idx];
               const restRooms = rooms.value.filter((r) => r?.id !== chatRoom?.id);

               rooms.value = [room, ...restRooms];
          }
          // else it adds new one into the rooms list
          else {
               rooms.value.unshift(chatRoom);
          }
     };

     const updateTypingStatus = (
          data: TypingDto & { typerId: string },
          isTyping = false
     ) => {
          const roomIdx = rooms.value.findIndex((r) => r?.id === data?.chatRoomId);

          if (roomIdx > -1) {
               const room = rooms.value[roomIdx];
               const chatUserIdx = room.chatUsers!.findIndex(
                    (cu) => cu?.userId === data.typerId
               );

               if (chatUserIdx > -1) {
                    room.chatUsers![chatUserIdx].user!.isTyping = isTyping;
               }
          }
     };

     const updateOnlineStatus = (userId: string, isOnline = false) => {
          const room = rooms.value.find((r) => r.chatUsers![0]?.userId === userId);
          if (room) {
               room.chatUsers![0].user!.isOnline = isOnline;
               room.chatUsers![0].user!.lastSeen = new Date().toISOString();
          }
     }

     const syncSentMessageToSelectedRoom = (data: ChatEntity) => {
          if (selectedRoom.value && selectedRoom.value.id === data.chatRoomId) {
               selectedRoom.value.lastChat = data;
               selectedRoom.value.chats?.push(data);

               moveRoomToTop(selectedRoom.value);
          }
     };

     const updateChatReadStatus = (data: { chatRoomId: string; seenCount: number }) => {
          const room = rooms.value.find((r) => r.id === data.chatRoomId);
          if (room) {
               room.unreadCount = 0;
               room.lastChat!.isSeen = true;

               // update message's seen status
               if (selectedRoom.value) {
                    selectedRoom.value.lastChat!.isSeen = true;
                    const unreadMessages = selectedRoom.value.chats?.filter(
                         (c) => !c.isSeen
                    );

                    for (const m of unreadMessages ?? []) {
                         m.isSeen = true;
                    }
               }
          }
     }

     const updateOnNewMessage = (data: ChatEntity) => {
          const room = rooms.value.find((r) => r.id === data.chatRoomId);

          if (room) {
               room.unreadCount = room.unreadCount! + 1;
               room.lastChat = data;
               moveRoomToTop(room);
          } else {
               console.log(data.chatRoom)
               if (data.chatRoom) {
                    rooms.value.unshift({ ...data.chatRoom!, lastChat: data });
               }
          }
     }

     const updateSelectedRoomsLastChatSeenStatus = () => {
          if (selectedRoom.value) {
               if (!selectedRoom.value.lastChat?.isSeen)
                    selectedRoom.value.lastChat!.isSeen = true;

               if (selectedRoom.value.unreadCount)
                    selectedRoom.value.unreadCount = 0;
          }
     }

     return {
          rooms,
          unreadMessageCount,
          selectedRoom,
          hasRecentChats,
          setRooms,
          setSelectedRoom,
          setSelectedRoomsChat,
          moveRoomToTop,
          syncSentMessageToSelectedRoom,
          updateTypingStatus,
          updateOnlineStatus,
          updateChatReadStatus,
          updateOnNewMessage,
          updateSelectedRoomsLastChatSeenStatus
     }
})