import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { CommentEntity } from "./comment.entity";
import { PostLikeEntity } from "./post-like.entity";
import { PostMediaEntity } from "./post-media.entity";
import { SavedPostEntity } from "./saved-post.entity";

export class PostEntity extends BaseEntity {
     creatorId?: string;
     caption?: string;
     creator?: User
     medias?: PostMediaEntity[]
     likes?: PostLikeEntity[]
     comments?: CommentEntity[]
     savedUsers?: SavedPostEntity[]
     likeCount?: number
     commentCount?: number
     liked?: boolean
     saved?: boolean

     constructor(data?: Partial<PostEntity>) {
          super()
          Object.assign(this, data)
     }
}