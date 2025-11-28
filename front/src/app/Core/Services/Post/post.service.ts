import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';
import { Post, CreatePostPayload } from '../../../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly api = `${environment.apiUrl}/posts`;

 /**
   * Obtiene todos los posts
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.api).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Obtiene un post por su ID
   * @param postId - ID del post a buscar
   */
  getPostById(postId: string): Observable<Post> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.get<Post>(`${this.api}/${postId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Crea un nuevo post
   * @param payload - Datos del post a crear
   */
  createPost(payload: CreatePostPayload | FormData): Observable<Post> {
    return this.http.post<Post>(this.api, payload).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Actualiza un post existente
   * @param postId - ID del post a actualizar
   * @param payload - Datos actualizados
   */
  /*updatePost(postId: string, payload: Partial<Post>): Observable<Post> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.put<Post>(`${this.api}/${postId}`, payload).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }*/

  /**
   * Elimina un post por su ID
   * @param postId - ID del post a eliminar
   */
  deletePostById(postId: string): Observable<void> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.delete<void>(`${this.api}/${postId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Agrega un comentario a un post
   * @param postId - ID del post
   * @param comment - Comentario a agregar
   */
  addComment(postId: string, comment: any): Observable<Post> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.post<Post>(`${this.api}/${postId}/comments`, comment).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Da "me gusta" a un post
   * @param postId - ID del post
   */
  likePost(postId: string): Observable<Post> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.post<Post>(`${this.api}/${postId}/like`, {}).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Quita "me gusta" de un post
   * @param postId - ID del post
   */
  unlikePost(postId: string): Observable<Post> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.delete<Post>(`${this.api}/${postId}/like`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
