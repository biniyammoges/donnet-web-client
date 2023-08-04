import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { CommentLikeEntity } from "./comment-like.entity";
import { PostEntity } from "./post.entity";

export class CommentEntity extends BaseEntity {
     parentCommentId?: string;
     parentComment?: CommentEntity
     replies?: CommentEntity[]
     commentorId?: string
     commentor?: User
     text?: string
     postId?: string
     post?: PostEntity
     likes?: CommentLikeEntity[]
     likeCount?: number
     replyCount?: number

     constructor(data?: Partial<CommentEntity>) {
          super()
          Object.assign(this, data)
     }
}