import { ChatEntity } from "./chat.entity";
import { ChatUserEntity } from "./chat-user.entity";
import { BaseEntity } from "../base.entity";

export enum ChatRoomType {
     Private = 'private',
     Group = 'group'
}

export class ChatRoomEntity extends BaseEntity {
     type?: ChatRoomType
     chats?: ChatEntity[]
     chatUsers?: ChatUserEntity[]
     unreadCount?: number
     lastChat?: ChatEntity

     constructor(data?: ChatRoomEntity) {
          super()
          Object.assign(this, data)
     }
}