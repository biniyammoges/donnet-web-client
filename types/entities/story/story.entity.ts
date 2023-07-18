import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { StoryViewer } from "./story-viewer.entity";
import { StoryMedia } from "./strory-media.entity";

export class Story extends BaseEntity {
     creatorId?: string
     creator?: User
     expire?: Date
     isArchived?: boolean;
     medias?: StoryMedia[]
     viewers?: StoryViewer[]
     storyMessages?: any[]

     constructor(data?: Partial<Story>) {
          super()
          Object.assign(this, data)
     }
}