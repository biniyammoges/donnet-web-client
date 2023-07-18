import { BaseEntity } from "../base.entity";
import { User } from "../user.entity";
import { Story } from "./story.entity";

export class StoryViewer extends BaseEntity {
     storyId?: string;
     story?: Story;
     viewerId?: string;
     viewer?: User;
}