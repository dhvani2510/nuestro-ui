import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'http://localhost:8081/api/v1/users';
  private apiUrl = 'https://nuestro.iverique.com/api/v1/users';
  constructor(private http: HttpClient, private authService: AuthenticationService) {}
  private getHeaders(): HttpHeaders {
    let token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl+'/me', {headers});
  }

  editDatabase(json: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl+'/database',json, {headers});  }
}
