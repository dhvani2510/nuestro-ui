import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/app.service";
import { AuthenticationService } from "src/app/authentication.service";
import { UserService } from "src/app/user.service";
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
    private service: AppService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  goBack()  {
    this.router.navigate(["/"]);
  }

  closeAlert(): void {
    this.validateUser = true; // Set validateUser to true to hide the alert
  }

  ngOnInit() {
    if (this.service.checkLogin()) {
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
          this.service.isLoggedIn(true);
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

  showPassword = "password";
  showPasswordFunction() {
    if (this.showPassword == "password") {
      this.showPassword = "text";
    } else {
      this.showPassword = "password";
    }
  }
  url1 = "http://localhost:10083/login/logout";
  logout()
  {

    if(confirm("you want to logout??"))
    { if(this.service.checkLogin())
      {
        this.authService.logoutService();
        this.httpClient.get(this.url1).subscribe(res=>
          {
              alert("Logout successful");
          });
       
        this.router.navigate(["/home"]);
      }}
      else{
        alert("ohk");
      }
   
  }

  checkLogin() {
    return this.service.checkLogin();
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
