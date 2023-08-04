import { BaseEntity } from "../base.entity";
import { FileEntity } from "../file.entity";
import { PostEntity } from "./post.entity";

export class PostMediaEntity extends BaseEntity {
     fileId?: string;
     file?: FileEntity
     postId?: string;
     post?: PostEntity

     constructor(data?: Partial<PostMediaEntity>) {
          super()
          Object.assign(this, data)
     }
}