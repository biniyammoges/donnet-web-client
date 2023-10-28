import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { StoryEntity } from "./story.entity";

export class StoryViewerEnity extends BaseEntity {
     storyId?: string;
     story?: StoryEntity;
     viewerId?: string;
     viewer?: User;
}