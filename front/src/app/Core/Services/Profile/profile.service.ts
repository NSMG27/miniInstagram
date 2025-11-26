import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/me';

  getProfile(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }
}
