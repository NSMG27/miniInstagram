import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly api = `${environment.apiUrl}/posts`;

  /**
   * Da "me gusta" a un post
   * @param postId - ID del post
   */
  like(postId: string): Observable<any> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.post(`${this.api}/${postId}/like`, {}).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  /**
   * Quita el "me gusta" de un post
   * @param postId - ID del post
   */
  unlike(postId: string): Observable<any> {
    if (!postId?.trim()) {
      throw new Error('ID de post inválido');
    }

    return this.http.delete(`${this.api}/${postId}/like`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
