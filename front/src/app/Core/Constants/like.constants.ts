/**
 * Constantes para likes
 */
export const LIKE_CONSTANTS = {
  ANIMATION_DURATION: 300, // ms
  DEBOUNCE_TIME: 500, // ms para evitar múltiples clicks
} as const;

/**
 * Mensajes de error para likes
 */
export const LIKE_ERROR_MESSAGES = {
  INVALID_POST_ID: 'ID de post inválido',
  INVALID_COMMENT_ID: 'ID de comentario inválido',
  LIKE_FAILED: 'Error al dar like',
  UNLIKE_FAILED: 'Error al quitar like',
  LOAD_FAILED: 'Error al cargar los likes',
} as const;

/**
 * Mensajes de éxito
 */
export const LIKE_SUCCESS_MESSAGES = {
  LIKED: 'Te gusta esta publicación',
  UNLIKED: 'Ya no te gusta esta publicación',
  COMMENT_LIKED: 'Te gusta este comentario',
  COMMENT_UNLIKED: 'Ya no te gusta este comentario',
} as const;