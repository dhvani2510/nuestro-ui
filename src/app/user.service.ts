import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
}
