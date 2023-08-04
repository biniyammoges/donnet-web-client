import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { PostEntity } from "./post.entity";

export class PostLikeEntity extends BaseEntity {
     likerId?: string
     liker?: User
     postId?: string
     post?: PostEntity

     constructor(data?: Partial<PostLikeEntity>) {
          super()
          Object.assign(this, data)
     }
}