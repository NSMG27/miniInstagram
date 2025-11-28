/**
 * Constantes para comentarios
 */
export const COMMENT_CONSTANTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 500,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Mensajes de error para comentarios
 */
export const COMMENT_ERROR_MESSAGES = {
  EMPTY_TEXT: 'El comentario no puede estar vacío',
  TOO_LONG: `El comentario no puede exceder ${COMMENT_CONSTANTS.MAX_LENGTH} caracteres`,
  INVALID_POST_ID: 'ID de post inválido',
  INVALID_COMMENT_ID: 'ID de comentario inválido',
  CREATE_FAILED: 'Error al crear el comentario',
  UPDATE_FAILED: 'Error al actualizar el comentario',
  DELETE_FAILED: 'Error al eliminar el comentario',
  LOAD_FAILED: 'Error al cargar los comentarios',
} as const;

/**
 * Mensajes de éxito
 */
export const COMMENT_SUCCESS_MESSAGES = {
  CREATED: 'Comentario publicado correctamente',
  UPDATED: 'Comentario actualizado correctamente',
  DELETED: 'Comentario eliminado correctamente',
} as const;

/**
 * Opciones de ordenamiento para comentarios
 */
export const COMMENT_SORT_OPTIONS = {
  NEWEST: { sortBy: 'createdAt' as const, order: 'desc' as const },
  OLDEST: { sortBy: 'createdAt' as const, order: 'asc' as const },
  MOST_LIKED: { sortBy: 'likes' as const, order: 'desc' as const },
} as const;

/**
 * Configuración de paginación por defecto
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: COMMENT_CONSTANTS.DEFAULT_PAGE_SIZE,
} as const;