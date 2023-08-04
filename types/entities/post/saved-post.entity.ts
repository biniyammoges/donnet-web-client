import { BaseEntity } from "../base.entity"
import { User } from "../user.entity"
import { PostEntity } from "./post.entity"

export class SavedPostEntity extends BaseEntity {
     userId?: string
     user?: User
     postId?: string
     post?: PostEntity

     constructor(data?: Partial<SavedPostEntity>) {
          super()
          Object.assign(this, data)
     }
}