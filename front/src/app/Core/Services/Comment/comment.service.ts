import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly api = `${environment.apiUrl}/posts`;

  /**
   * Lista todos los comentarios de un post
   * @param postId - ID del post
   */
  getCommentsByPost(postId: string): Observable<any[]> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.get<any[]>(`${this.api}/${postId}/comments`).pipe(
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Agrega un comentario a un post
   * @param postId - ID del post
   * @param payload - Datos del comentario
   */
  addComment(postId: string, payload: { text: string}): Observable<any> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.post(`${this.api}/${postId}/comments`, payload).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Elimina un comentario específico
   * @param postId - ID del post
   * @param commentId - ID del comentario
   */
  deleteComment(postId: string, commentId: string): Observable<void> {
    if (!postId?.trim() || !commentId?.trim()) {
      throw new Error('IDs inválidos');
    }

    return this.http.delete<void>(`${this.api}/${postId}/comments/${commentId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
