import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  isLoggedIn(bool:boolean)
  {
   
    localStorage.setItem('auth',String(bool));
    return bool;

  }
  checkLogin()
  {
    const auth = localStorage.getItem('token');
    if(auth)
    {
      return true;
    }
    else{
      return false;
    }
  }
}
