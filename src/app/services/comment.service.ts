import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://nuestro.iverique.com/api/v1/comments/posts/';
  private apiUrl1 = 'https://nuestro.iverique.com/api/v1/comments/';
  constructor(private http: HttpClient, private authService: AuthenticationService) {}
  private getHeaders(): HttpHeaders {
    let token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  addComment(id:string,json:any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}${id}`, json, {headers});
  }

  editComment(id:string, json:any):Observable<any>  {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl1}${id}`, json, {headers});
  }

  deleteComment(id:string):Observable<any>  {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl1}${id}`, {headers});
  }
}
