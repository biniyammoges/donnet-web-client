export class BaseEntity {
     id?: string;
     createdAt?: Date | string;
     updatedAt?: Date | string;

     constructor(data?: Partial<BaseEntity>) {
          Object.assign(this, data)
     }
}