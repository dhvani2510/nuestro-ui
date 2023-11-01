import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
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
    return this.http.get(this.apiUrl+'getBlog/'+blogId, {headers});
  }
  deleteBlog(id: string) {
    const headers = this.getHeaders();
    return this.http.delete(this.apiUrl+'delete/'+id, {headers});
  }

  editBlog(json: any) :Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl+'edit',json, {headers});  
  }
}
