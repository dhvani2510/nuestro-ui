import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; // Remove curly braces from FormsModule

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  formValid: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  url = "http://localhost:8081/api/v1/auth/";
  // url = "https://nuestro.iverique.com/api/v1/auth/";


  alert = false;
  usernameError: string = '';
  emailused = false;
  isLoading = false; // Add isLoading property

  async ngOnInit()  {
    // await this.validateUsername();
  }

  isValidEmail(email: string) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
  }
  


  validateForm() {
    console.log(this.signupForm.valid);
    
    this.formValid = this.signupForm.valid;
  }
  

  onSubmit() {
    const json = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      email: this.email,
    };

    this.httpClient.post(this.url+'register', json).subscribe(
      (res: any) => {
      console.log(res);
      if (res.status == 409) {
        this.emailused = true;
      } else {
        this.alert = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }
    }, 
    (error:any) => {
      if(error.status == 400)  {
        this.emailused = true;
      }
    });
  }

  closeSuccessAlert() {
    this.alert = false; // Hide success alert popup
  }

  closeErrorAlert() {
    this.emailused = false; // Hide error alert popup
  }
}
