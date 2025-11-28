import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private api = environment.apiUrl + '/posts';

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getPostById(post: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${post}`);
  }

  createPost(payload: any): Observable<any> {
    return this.http.post<any>(this.api, payload);
  }

   deletePostById(post: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${post}`);
  }
}
