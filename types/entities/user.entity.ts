import { BaseEntity } from "./base.entity";
import { FileEntity as File } from "./file.entity";
import { FollowerEntity } from "./follower.entity";

export class User extends BaseEntity {
     firstName?: string;
     lastName?: string;
     username?: string;
     phone?: string;
     email?: string;
     bio?: string;
     location?: string;
     isOnline?: boolean;
     lastSeen?: Date | string;
     website?: string;
     avatar?: File;
     avatarId?: string;
     birthDate?: Date;
     followers?: FollowerEntity[];
     followings?: FollowerEntity[];
     postCount?: number
     savedPostCount?: number
     followerCount?: number
     followingCount?: number
     following?: boolean
     isTyping?: boolean

     constructor(data?: Partial<User>) {
          super()
          Object.assign(this, data)
     }
};