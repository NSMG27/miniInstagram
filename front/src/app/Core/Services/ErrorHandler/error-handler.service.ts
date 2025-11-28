import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  HTTP_ERROR_MESSAGES,
  USER_FRIENDLY_MESSAGES,
  ErrorType,
  HTTP_STATUS_TO_ERROR_TYPE,
  ERROR_ICONS,
} from '../../Constants/http-error.constants';
import { AppError } from '../../../interfaces/app-error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  /**
   * Maneja errores HTTP y los transforma en errores de aplicación
   * @param error - Error HTTP recibido
   * @returns Observable con el error procesado
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    const appError = this.transformError(error);
    
    // Log del error (en producción enviar a servicio de logging)
    this.logError(appError);
    
    return throwError(() => appError);
  }

  /**
   * Transforma un HttpErrorResponse en un AppError
   * @param error - Error HTTP
   * @returns AppError con información procesada
   */
  private transformError(error: HttpErrorResponse): AppError {
    const timestamp = new Date();

    // Error del cliente (red, CORS, etc.)
    if (error.error instanceof ErrorEvent) {
      return {
        type: ErrorType.NETWORK,
        message: HTTP_ERROR_MESSAGES.NETWORK_ERROR,
        userMessage: USER_FRIENDLY_MESSAGES.NETWORK_ERROR,
        icon: ERROR_ICONS[ErrorType.NETWORK],
        timestamp,
        originalError: error,
        shouldRetry: true,
      };
    }

    // Error del servidor
    const statusCode = error.status;
    const errorType = this.getErrorType(statusCode);
    const message = this.getErrorMessage(statusCode);
    const userMessage = this.getUserFriendlyMessage(statusCode);

    return {
      type: errorType,
      statusCode,
      message,
      userMessage,
      icon: ERROR_ICONS[errorType],
      timestamp,
      originalError: error,
      shouldRetry: this.shouldRetry(errorType),
    };
  }

  /**
   * Determina el tipo de error según el código de estado
   * @param statusCode - Código HTTP
   * @returns Tipo de error
   */
  private getErrorType(statusCode: number): ErrorType {
    // Sin conexión
    if (statusCode === 0) {
      return ErrorType.NETWORK;
    }

    // Buscar en el mapa de tipos
    const errorType = HTTP_STATUS_TO_ERROR_TYPE[statusCode as keyof typeof HTTP_STATUS_TO_ERROR_TYPE];
    if (errorType) {
      return errorType;
    }

    // Clasificar por rango
    if (statusCode >= 400 && statusCode < 500) {
      return ErrorType.CLIENT;
    }

    if (statusCode >= 500 && statusCode < 600) {
      return ErrorType.SERVER;
    }

    return ErrorType.UNKNOWN;
  }

  /**
   * Obtiene el mensaje técnico del error
   * @param statusCode - Código HTTP
   * @returns Mensaje de error
   */
  private getErrorMessage(statusCode: number): string {
    if (statusCode === 0) {
      return HTTP_ERROR_MESSAGES.NETWORK_ERROR;
    }

    const message = HTTP_ERROR_MESSAGES[statusCode as keyof typeof HTTP_ERROR_MESSAGES];
    return message || HTTP_ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  /**
   * Obtiene el mensaje amigable para el usuario
   * @param statusCode - Código HTTP
   * @returns Mensaje amigable
   */
  private getUserFriendlyMessage(statusCode: number): string {
    if (statusCode === 0) {
      return USER_FRIENDLY_MESSAGES.NETWORK_ERROR;
    }

    const message = USER_FRIENDLY_MESSAGES[statusCode as keyof typeof USER_FRIENDLY_MESSAGES];
    return message || USER_FRIENDLY_MESSAGES.UNKNOWN_ERROR;
  }

  /**
   * Determina si se debe reintentar la petición
   * @param errorType - Tipo de error
   * @returns true si se debe reintentar
   */
  private shouldRetry(errorType: ErrorType): boolean {
    return [ErrorType.SERVER, ErrorType.NETWORK].includes(errorType);
  }

  /**
   * Registra el error (consola en desarrollo, servicio en producción)
   * @param error - Error de aplicación
   */
  private logError(error: AppError): void {
    console.group(`🔴 Error ${error.type}`);
    console.error('Tipo:', error.type);
    console.error('Código:', error.statusCode || 'N/A');
    console.error('Mensaje:', error.message);
    console.error('Usuario:', error.userMessage);
    console.error('Timestamp:', error.timestamp.toISOString());
    console.error('Original:', error.originalError);
    console.groupEnd();

    // TODO: En producción, enviar a servicio de logging
    // this.loggingService.logError(error);
  }

  /**
   * Verifica si un error es de tipo específico
   * @param error - Error a verificar
   * @param type - Tipo de error a comparar
   * @returns true si coincide el tipo
   */
  isErrorType(error: AppError, type: ErrorType): boolean {
    return error.type === type;
  }

  /**
   * Verifica si un error debe mostrar notificación persistente
   * @param error - Error a verificar
   * @returns true si debe ser persistente
   */
  shouldShowPersistentNotification(error: AppError): boolean {
    return [
      ErrorType.AUTHENTICATION,
      ErrorType.AUTHORIZATION,
      ErrorType.SERVER,
    ].includes(error.type);
  }

  /**
   * Obtiene el código HTTP desde un AppError o HttpErrorResponse
   * @param error - Error
   * @returns Código HTTP o undefined
   */
  getStatusCode(error: AppError | HttpErrorResponse): number | undefined {
    if ('statusCode' in error) {
      return error.statusCode;
    }
    if ('status' in error) {
      return error.status;
    }
    return undefined;
  }

  /**
   * Verifica si es un error HTTP específico
   * @param error - Error
   * @param status - Código HTTP a comparar
   * @returns true si coincide
   */
  isHttpStatus(error: AppError | HttpErrorResponse, status: number): boolean {
    const statusCode = this.getStatusCode(error);
    return statusCode === status;
  }
}
