import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  private loggedInSubscription: Subscription;
  user: any;
  private userSubscription :Subscription;

  constructor(private router: Router, private authService: AuthenticationService) { 
    this.loggedInSubscription = this.authService.userLoggedIn$.subscribe((value) => {
      this.userLoggedIn = value;
    });
    this.user = this.authService.getUser();
    this.userSubscription = authService.user$.subscribe((value)=> {
      this.user = value;
    })

    // Subscribe to changes in the user data from the AuthenticationService.
    this.authService.user$.subscribe((userData) => {
      this.user = userData;
    });
  }

  capitalizeFirstLetter(input:string)  {
    return input.charAt(0).toUpperCase() + input.slice(1);

  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  showUsers() {
    this.router.navigate(["/userList"]);
  }
  
  blogPage() {
    this.router.navigate(["/createPost"]);
  }

  ngOnInit() {  
    this.userLoggedIn = this.authService.getUserLoggedIn();
    console.log(this.userLoggedIn);
    
    if (this.userLoggedIn) {
      this.user = this.authService.getUser();
    }
    console.log(this.user);
    
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToProfile() {
    console.log(this.user);
    
    this.router.navigate(['/profile/'+this.user.id]);
  }

  logout() {
    this.authService.logoutService();

    this.router.navigate(['/']);
  }
}
