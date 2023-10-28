import { BaseEntity } from "../base.entity";
import { StoryEntity } from "./story.entity";

export class StoryMediaEntity extends BaseEntity {
     storyId?: string;
     story?: StoryEntity;
     fileId?: string;
     file?: any;

     constructor(data?: Partial<StoryMediaEntity>) {
          super()
          Object.assign(this, data)
     }
}