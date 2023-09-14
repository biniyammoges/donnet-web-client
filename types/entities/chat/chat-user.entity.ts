import { BaseEntity } from "../base.entity";
import { User as UserEntity } from "../user.entity";
import { ChatRoomEntity } from "./chat-room.entity";

export class ChatUserEntity extends BaseEntity {
     userId?: string;
     user?: UserEntity
     chatRoomId?: string;
     chatRoom?: ChatRoomEntity

     constructor(data?: ChatUserEntity) {
          super()
          Object.assign(this, data)
     }
}