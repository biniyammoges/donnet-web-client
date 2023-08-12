export interface CommentReplyEventDto {
     username?: string;
     commentId?: string
}

export type CommentReplyEvent = {
     (e: 'on-reply', dto: CommentReplyEventDto): void
}