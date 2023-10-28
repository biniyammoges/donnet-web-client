import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { StoryViewerEnity } from "./story-viewer.entity";
import { StoryMediaEntity } from "./strory-media.entity";

export class StoryEntity extends BaseEntity {
     creatorId?: string
     creator?: User
     expire?: Date
     isArchived?: boolean;
     medias?: StoryMediaEntity[]
     viewers?: StoryViewerEnity[]
     storyMessages?: any[]

     constructor(data?: Partial<StoryEntity>) {
          super()
          Object.assign(this, data)
     }
}