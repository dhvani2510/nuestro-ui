import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  // private apiUrl = 'http://localhost:8081/api/v1/posts/';
  private apiUrl = 'https://nuestro.iverique.com/api/v1/posts/';
  constructor(private http: HttpClient, private authService: AuthenticationService) {}
  private getHeaders(): HttpHeaders {
    let token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getCompleteBlog(blogId: string) : Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl+blogId, {headers});
  }
  deleteBlog(id: string) {
    const headers = this.getHeaders();
    return this.http.delete(this.apiUrl+'delete/'+id, {headers});
  }

  editBlog(blogId:string,json: any) :Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.apiUrl+blogId,json, {headers});  
  }
}
