export class User {
     id?: string;
     firstName?: string;
     lastName?: string;
     username?: string;
     phone?: string;
     email?: string;
     bio?: string;
     location?: string;
     website?: string;
     avatar?: any;
     avatarId?: string;
     birthDate?: Date;
     createdAt?: Date;
     updatedAt?: Date;

     constructor(data?: Partial<User>) {
          Object.assign(this, data)
     }
};