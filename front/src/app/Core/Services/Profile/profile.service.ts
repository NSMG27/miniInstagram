import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private baseUrl = environment.apiUrl + '/me';

  getProfile(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}`)
      .pipe(
        catchError(error => this.errorHandler.handleError(error))
      );
  }
}
