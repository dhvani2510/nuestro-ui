import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  blogEditForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) { 
    this.blogEditForm = this.formBuilder.group({
      content: [''],
      title: [''],
      category: [''],
    });
  }
  submitted = false;
  blogUrl = "http://localhost:10083/blog/getBlogs/"+sessionStorage.getItem('userId');
  url1 = "http://localhost:10083/blog/id/";
  async ngOnInit() {  
  this.route.paramMap.subscribe((params: ParamMap) => {
    let id = params.get("id");
    this.blogId = id?id:'';
  });

  this.getBlog(this.blogId);
  }

  async getBlog(blogId: string){
    let res = await this.blogService.getCompleteBlog(blogId).toPromise();
    console.log(res);
    if (res != null && res !== undefined) {
        console.log(res.data);
        this.content = res.data.content;
    }
    else
      this.errorAlert= true;
  }


  blogId: string ='';
  content: any;
  access: any;
  blogs=[];
  alert:boolean=false;
  errorAlert:boolean = false;
  closeSuccessAlert() {
      this.alert = false;
  }
  closeErrorAlert()  {
    this.errorAlert = false;
  }
  editBlog(blogId: any)
  {
    this.submitted = true;
    let json={
      content : this.content,
    }

    this.blogService.editBlog(blogId,json).subscribe(
      (res:any) => {
        if(res.status==200) {
          this.alert = true;
        }
        else
          this.errorAlert =true;
      },
      (err:any) => {
        console.log(err);
        this.errorAlert = true;
      });
  }
  id: string='';
  sendId()
  {
      this.router.navigate(["/profile/"+this.id]);
  }
}
