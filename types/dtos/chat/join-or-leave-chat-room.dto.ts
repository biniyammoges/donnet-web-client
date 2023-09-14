export interface JoinChatRoomDto {
     recipientId: string
     chatRoomId?: string
     isGroupChat?: boolean
}

export interface LeaveChatRoomDto {
     chatRoomId: string
}