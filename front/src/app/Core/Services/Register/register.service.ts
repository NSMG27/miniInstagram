import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Register, RegisterResponse } from '../../../interfaces/register.interface';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);
  private readonly registerUrl = environment.apiUrl + '/register';

  register(data: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registerUrl, data).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
