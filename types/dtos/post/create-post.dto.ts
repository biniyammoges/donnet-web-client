type Media = {
     fileId: string;
     postId?: string;
}

export type CreatePostDto = {
     caption?: string;
     medias?: Media[]
}