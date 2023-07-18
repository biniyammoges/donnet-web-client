import { BaseEntity } from "../base.entity";
import { Story } from "./story.entity";

export class StoryMedia extends BaseEntity {
     storyId?: string;
     story?: Story;
     fileId?: string;
     file?: any;

     constructor(data?: Partial<StoryMedia>) {
          super()
          Object.assign(this, data)
     }
}