import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  id:any;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  goBack()  {
    this.router.navigate(["/"]);
  }

  closeAlert(): void {
    this.validateUser = true; // Set validateUser to true to hide the alert
  }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      this.router.navigate(["/login"]);
    }
  }
  validateUser = true;
  login() {
    if (this.email == '' || this.password == '') {
      this.validateUser = false;
    } else {
      this.validateUser = true;
    }
    if (this.validateUser) {
      this.authService.authenticate(this.email, this.password).subscribe(
        data => {
          this.authService.setUserLoggedIn(true);          
          this.authService.isLoggedIn(true);
          console.log("login succesfull");
          this.getUser();
          this.router.navigate(["/home"]);
        },
        error => {
          this.validateUser = false;
          console.log("failed");
        }
      );
    }
  }

  getUser() {
    this.userService.getUser().subscribe(
      (res: any) => {
        if (res.status == 200) {
          console.log(res.data);
          this.authService.setUser(res.data);
        } else {
          console.log(res.message);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  checkLogin() {
    return this.authService.checkLogin();
  }

  red() {
    this.router.navigate(["/home"]);
  }
  forget()
  {
    let url = "http://localhost:10083/login/forgetPassword";

    let email={
      "email":this.email
    }
    this.httpClient.post(url,email).subscribe((res:any)=>
    {
      if(res)
      {
        alert("Mail has been sent to given mail");
      }
      else{
        alert("mail id not found!");
      }
    }
    )
  }
 
}
