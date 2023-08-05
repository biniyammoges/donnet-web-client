import { formatDistanceToNow } from "date-fns";

export const dateToTimeAgo = (date: number | Date) => {
     console.log(date)
     formatDistanceToNow(date, { addSuffix: true });
}