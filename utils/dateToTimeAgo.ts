import { formatDistanceToNow } from "date-fns";

export const dateToTimeAgo = (date: number | Date) => {
     return formatDistanceToNow(date, { addSuffix: true });
}