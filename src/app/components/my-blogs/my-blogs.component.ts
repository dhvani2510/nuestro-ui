import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { BlogService } from 'src/app/blog.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss'],
})
export class MyBlogsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  id:string='';

  blogUrl = 'http://localhost:8080/api/blogs/getNyBlog/';
  blogId:string='';
  date:any;
  category:string='';
  content:string='';
  title:string="";
  blogs = [];
  array:any[] = [];
  superAccess = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    this.registerForm = this.formBuilder.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.id = id?id: '';
    });

    console.log(sessionStorage.getItem('userId'));
    console.log(this.id);
    if (sessionStorage.getItem('userId') == this.id) {
      this.superAccess = true;
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.id = id?id:'';
      this.blogUrl = this.blogUrl + id;
      console.log(this.blogUrl);
    });

    await this.ajaxCall();
  }
  get f() {
    return this.registerForm.controls;
  }
  async ajaxCall() {
    const headers = this.authService.addHeaders();

    this.httpClient.get(this.blogUrl, { headers }).subscribe((res:any) => {
      this.array = res.data;

      this.array.forEach((element:any) => {
        this.blogId = element.blogId;
        this.category = element.productId;
        this.content = element.products;
        this.title = element.title;
      });
    });
  }

  deleteBlog(id:string) {
    if (confirm('Are you sure you want to delete the blog?')) {
      this.blogService.deleteBlog(id).subscribe((res:any) => {
        console.log(res);
        this.ajaxCall();
        alert('blog deleted');
      });
    } else {
      alert('ohk');
    }
  }
  addBlog() {
    this.router.navigate(['/createPost']);
  }
}
