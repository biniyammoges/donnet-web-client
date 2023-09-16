import { ChatEntity, } from "types/entities";

export type ReplyChatEvent = {
     (e: 'on-reply', chat: ChatEntity): void
}