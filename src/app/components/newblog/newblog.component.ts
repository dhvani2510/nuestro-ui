import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.scss']
})
export class NewblogComponent implements OnInit {
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
    private service: AppService,
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

  blogUrl = "http://localhost:8081/api/v1/posts";

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
      alert('SUCCESS!! :-)\nBlog added successfully!');
    });
  }
}
