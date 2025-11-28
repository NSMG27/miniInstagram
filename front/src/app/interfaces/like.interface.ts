/**
 * Interfaz para un like
 */
export interface Like {
  id: string;
  postId?: string;
  commentId?: string;
  userId: string;
  user: string;
  createdAt: string;
}

/**
 * Payload para dar like
 */
export interface CreateLikePayload {
  postId?: string;
  commentId?: string;
  userId?: string;
}

/**
 * Respuesta de like
 */
export interface LikeResponse {
  liked: boolean;
  likesCount: number;
  message: string;
}

/**
 * Estadísticas de likes
 */
export interface LikeStats {
  totalLikes: number;
  isLikedByCurrentUser: boolean;
  recentLikes: Like[];
}