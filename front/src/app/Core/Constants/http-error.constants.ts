// src/app/Core/Constants/http-error.constants.ts

/**
 * Códigos de estado HTTP
 */
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Mensajes de error según código HTTP
 */
export const HTTP_ERROR_MESSAGES = {
  // Client Errors (4xx)
  [HTTP_STATUS.BAD_REQUEST]: 'Petición inválida. Verifica los datos enviados.',
  [HTTP_STATUS.UNAUTHORIZED]: 'No autorizado. Falta token o token inválido.',
  [HTTP_STATUS.FORBIDDEN]: 'Prohibido. No tienes permisos para esta acción.',
  [HTTP_STATUS.NOT_FOUND]: 'Recurso no encontrado.',
  [HTTP_STATUS.CONFLICT]: 'Conflicto. El recurso ya existe.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Error de validación en los datos enviados.',

  // Server Errors (5xx)
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Error inesperado en el servidor.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Servicio no disponible. Intenta más tarde.',

  // Generic
  NETWORK_ERROR: 'Error de conexión. Verifica tu red.',
  UNKNOWN_ERROR: 'Ocurrió un error desconocido.',
  TIMEOUT_ERROR: 'La petición tardó demasiado tiempo.',
} as const;

/**
 * Mensajes de error amigables para el usuario
 */
export const USER_FRIENDLY_MESSAGES = {
  // Success
  [HTTP_STATUS.OK]: 'Operación exitosa.',
  [HTTP_STATUS.CREATED]: 'Recurso creado exitosamente.',

  // Client Errors
  [HTTP_STATUS.BAD_REQUEST]: 'Los datos ingresados no son válidos. Por favor, revísalos e intenta nuevamente.',
  [HTTP_STATUS.UNAUTHORIZED]: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  [HTTP_STATUS.FORBIDDEN]: 'No tienes permiso para realizar esta acción. Contacta al administrador.',
  [HTTP_STATUS.NOT_FOUND]: 'No pudimos encontrar lo que buscas. Puede que haya sido eliminado.',
  [HTTP_STATUS.CONFLICT]: 'Este recurso ya existe. Intenta con otro nombre.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Algunos campos tienen errores. Por favor, corrígelos e intenta nuevamente.',

  // Server Errors
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Algo salió mal en nuestros servidores. Estamos trabajando para solucionarlo.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'El servicio no está disponible temporalmente. Intenta en unos minutos.',

  // Generic
  NETWORK_ERROR: 'No pudimos conectarnos al servidor. Verifica tu conexión a internet.',
  UNKNOWN_ERROR: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
  TIMEOUT_ERROR: 'La operación tardó demasiado tiempo. Por favor, intenta nuevamente.',
} as const;

/**
 * Tipos de errores para clasificación
 */
export enum ErrorType {
  CLIENT = 'CLIENT_ERROR',
  SERVER = 'SERVER_ERROR',
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

/**
 * Configuración de reintentos por tipo de error
 */
export const RETRY_CONFIG = {
  [ErrorType.SERVER]: {
    maxAttempts: 3,
    delay: 1000, // ms
    backoff: 2, // multiplicador exponencial
  },
  [ErrorType.NETWORK]: {
    maxAttempts: 2,
    delay: 2000,
    backoff: 1.5,
  },
  [ErrorType.CLIENT]: {
    maxAttempts: 0, // No reintentar errores del cliente
    delay: 0,
    backoff: 1,
  },
} as const;

/**
 * Duración de notificaciones de error (ms)
 */
export const ERROR_NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
  PERSISTENT: 0, // No se cierra automáticamente
} as const;

/**
 * Iconos para diferentes tipos de errores
 */
export const ERROR_ICONS = {
  [ErrorType.CLIENT]: '⚠️',
  [ErrorType.SERVER]: '🔴',
  [ErrorType.NETWORK]: '📡',
  [ErrorType.VALIDATION]: '📝',
  [ErrorType.AUTHENTICATION]: '🔒',
  [ErrorType.AUTHORIZATION]: '🚫',
  [ErrorType.NOT_FOUND]: '🔍',
  [ErrorType.UNKNOWN]: '❓',
} as const;

/**
 * Mapa de códigos HTTP a tipos de error
 */
export const HTTP_STATUS_TO_ERROR_TYPE = {
  [HTTP_STATUS.BAD_REQUEST]: ErrorType.VALIDATION,
  [HTTP_STATUS.UNAUTHORIZED]: ErrorType.AUTHENTICATION,
  [HTTP_STATUS.FORBIDDEN]: ErrorType.AUTHORIZATION,
  [HTTP_STATUS.NOT_FOUND]: ErrorType.NOT_FOUND,
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: ErrorType.VALIDATION,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ErrorType.SERVER,
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: ErrorType.SERVER,
} as const;

/**
 * Configuración de timeout para peticiones HTTP
 */
export const HTTP_TIMEOUT = {
  DEFAULT: 30000, // 30 segundos
  UPLOAD: 120000, // 2 minutos para uploads
  DOWNLOAD: 60000, // 1 minuto para downloads
  SHORT: 10000, // 10 segundos para operaciones rápidas
} as const;

/**
 * Acciones sugeridas por tipo de error
 */
export const ERROR_ACTIONS = {
  [ErrorType.AUTHENTICATION]: [
    { label: 'Iniciar sesión', action: 'LOGIN' },
    { label: 'Recuperar contraseña', action: 'RESET_PASSWORD' },
  ],
  [ErrorType.NETWORK]: [
    { label: 'Reintentar', action: 'RETRY' },
    { label: 'Verificar conexión', action: 'CHECK_CONNECTION' },
  ],
  [ErrorType.SERVER]: [
    { label: 'Reintentar', action: 'RETRY' },
    { label: 'Reportar problema', action: 'REPORT' },
  ],
  [ErrorType.NOT_FOUND]: [
    { label: 'Volver atrás', action: 'GO_BACK' },
    { label: 'Ir al inicio', action: 'GO_HOME' },
  ],
} as const;