import { BaseEntity } from "../base.entity"
import { User } from "../user.entity"
import { CommentEntity } from "./comment.entity"

export class CommentLikeEntity extends BaseEntity {
     likerId?: string
     liker?: User
     commentId?: string
     comment?: CommentEntity
}