/**
 * Interfaz para un comentario
 */
export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  user: string;
  text: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
  likes?: number;
  isLiked?: boolean;
}

/**
 * Payload para crear un comentario
 */
export interface CreateCommentPayload {
  postId: string;
  text: string;
  userId?: string;
  user?: string;
}

/**
 * Payload para actualizar un comentario
 */
export interface UpdateCommentPayload {
  text: string;
}

/**
 * Respuesta al crear/actualizar comentario
 */
export interface CommentResponse {
  comment: Comment;
  message: string;
}


/**
 * Opciones de paginación para comentarios
 */
export interface CommentPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'likes';
  order?: 'asc' | 'desc';
}

/**
 * Respuesta paginada de comentarios
 */
export interface PaginatedCommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}