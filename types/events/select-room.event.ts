import { ChatRoomEntity } from "types/entities";

export type SelectRoomEvent = {
     (e: 'on-select', room?: ChatRoomEntity): void
}