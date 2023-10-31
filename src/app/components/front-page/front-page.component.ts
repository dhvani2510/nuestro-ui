import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Implement your scroll behavior here
    if (window.pageYOffset > 100) {
      this.hasColor = true; // Change background color when scrolling down
    } else {
      this.hasColor = false; // Change back to the original background color when scrolling up
    }
  }

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private service: AppService, private authService: AuthenticationService, private formBuilder: FormBuilder) {}

  public hasColor = true;

  ngOnInit() {
    this.changeColor();
  }

  logoutUrl = "http://localhost:10083/login/logout";

  changeColor() {
    window.setInterval(() => {
      if (this.hasColor == true) {
        this.hasColor = false;
      } else {
        this.hasColor = true;
      }
    }, 3000);
  }

  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  red() {
    this.router.navigate(['/home']);
  }

  checkLogin() {
    return this.service.checkLogin();
  }

  home() {
    if (this.checkLogin()) {
      this.router.navigate(['/blog']);
    } else {
      this.login();
    }
  }
}
