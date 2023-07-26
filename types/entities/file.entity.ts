import { BaseEntity } from './base.entity'
import { User } from './user.entity'

export class FileEntity extends BaseEntity {
     name?: string
     size?: number
     type?: string
     path?: string
     url?: string
     privateUrl?: string
     creatorId?: string
     creator?: User

     constructor(data?: Partial<File>) {
          super()
          Object.assign(this, data)
     }
}

