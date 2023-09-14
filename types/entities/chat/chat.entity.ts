import { ChatRoomEntity } from "./chat-room.entity";
import { BaseEntity } from "../base.entity";
import { User as UserEntity } from '~/types'

export class ChatEntity extends BaseEntity {
     parentChatId?: string
     parentChat?: ChatEntity
     message?: string;
     senderId?: string;
     sender?: UserEntity
     chatRoomId?: string;
     chatRoom?: ChatRoomEntity
     isSeen?: boolean
     storyMessage?: any

     constructor(data: ChatEntity) {
          super()
          Object.assign(this, data)
     }
}