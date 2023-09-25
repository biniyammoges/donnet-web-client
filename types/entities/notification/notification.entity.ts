import { BaseEntity } from "../base.entity";
import { ChatUserEntity } from "../chat";
import { User } from "../user.entity";

// Notifications
export enum NotificationType {
     Default = 'default',
     Reply = 'reply',
     Like = 'like',
     Comment = 'comment',
     CommentLike = 'comment-like',
     Message = 'message',
     Follow = 'follow',
     AddedStory = 'added-story',
}

export class NotificationEntity extends BaseEntity {
     type?: NotificationType
     message?: string;
     action?: string;
     isRead?: boolean
     receiverId?: string
     receiver?: User
     senderId?: string
     sender?: User

     constructor(data?: Partial<NotificationEntity>) {
          super()
          Object.assign(this, data)
     }
}