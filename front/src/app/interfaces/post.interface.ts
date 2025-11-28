export interface Post {
  id: string;
  user: string;
  image: string;
  likes: number;
  comments: Comment[];
  avatar?: string;
  description?: string;
  createdAt?: string;
}

export interface CreatePostPayload {
  user: string;
  image: File;
  caption?: string;
}
