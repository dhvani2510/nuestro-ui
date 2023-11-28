import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.scss']
})
export class NewblogComponent implements OnInit {
  alert:boolean=false;
  success:boolean=false;
  alertHeader:string='';
  alertMessage:string='';
  blogForm: FormGroup;
  blog: any = {
    title: '',
    content: '',
    category: '',
    blogDescription: '',
  };
  access: boolean = false;
  submitted: boolean = false;
  error: string = ''; // Add an error message property

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { 
    this.blogForm = this.formBuilder.group({
      content: [''],
      title: [''],
      category: [''],
    });
  }

  ngOnInit() {  }

  blogUrl = "https://nuestro.iverique.com/api/v1/posts";

  submitForm() {
    const headers = this.authService.addHeaders();
    this.submitted = true;

    if (this.blogForm.invalid) {
      this.error = 'Please fill in all the required fields.';
      return;
    } else {
      this.error = ''; // Clear the error message if the form is valid
    }

    const request = {
      content: this.blog.content
    };

    this.httpClient.post(this.blogUrl, request, { headers }).subscribe(res => {
      console.log(res);
      this.alert =true;
      this.alertHeader="Success!";
      this.alertMessage= "Blog has been posted successfully.";
      this.success=true
        setTimeout(() => {
          this.router.navigate(['/home']);
        },3000)
    },
    (err:any) => {
      this.alert =true;
      this.alertHeader="Error!";
      this.alertMessage= "Something went Wrong!";
      this.success=false
    });
  }
  closeAlert() {
    this.alert = false; // Assuming 'alert' is a property controlling the visibility of the alert
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeAlert();
  }
}
