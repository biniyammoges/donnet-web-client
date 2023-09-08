import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

export class FollowerEntity extends BaseEntity {
     followerId?: string;
     follower?: User
     followeeId?: string;
     followee?: User

     constructor(data?: Partial<User>) {
          super()
          Object.assign(this, data)
     }
}
