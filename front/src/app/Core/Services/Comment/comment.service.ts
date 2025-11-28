import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private api = environment.apiUrl + '/posts';

  getAllComment(post: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${post}/comments`);
  }

  createComment(post: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/${post}/comments`, payload);
  }
}
