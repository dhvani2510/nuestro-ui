import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Route, Router } from '@angular/router';

;;
class User {
  id = '';
  firstName='';
  lastName='';
  email='';
  password='';
  username='';
  bio='';
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private apiUrl = 'http://localhost:8081/api/v1/auth';
  private apiUrl = 'https://nuestro.iverique.com/api/v1/auth';

  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSubject.asObservable();
  private userSubject = new BehaviorSubject<User>(new User());
  user$ = this.userSubject.asObservable();

  getUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
    return this.userSubject.getValue();
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
  

  setUserLoggedIn(value: boolean) {
    console.log("set logged in to true "+ value);
    this.userLoggedInSubject.next(value);
  }

  getUserLoggedIn() {    
    return this.userLoggedInSubject.value;
  }

  constructor(private http: HttpClient,private router:Router) {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (storedToken) {
    this.tokenSubject.next(storedToken);
    this.userLoggedInSubject.next(!!storedToken);
  }

  if (storedUser) {
    this.userSubject.next(JSON.parse(storedUser));
  }
}
  
  authenticate(email: string,password:string)
  {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
          map ((data:any) => {
              localStorage.setItem('token',data.data.token);
              this.tokenSubject.next(localStorage.getItem('token'));              
          }
      ));
  }

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  logoutService() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    this.setUserLoggedIn(false);
    this.router.navigate(['/']);
  }  

  setToken(token: string | null): void {    
    this.tokenSubject.next(token);

    if (token) {
      localStorage.setItem('token', token);
    }
  }

  addHeaders(){
    const token=localStorage.getItem("token");
    const headers=new HttpHeaders({ Authorization: " Bearer " + token });
    return headers;
  }

  getToken() {
    return this.tokenSubject.getValue();
  }
  
  isLoggedIn(bool: boolean) {

    localStorage.setItem('auth', String(bool));
    return bool;

  }
  checkLogin() {
    const auth = localStorage.getItem('token');
    if (auth) {
      return true;
    }
    else {
      return false;
    }
  }
}

