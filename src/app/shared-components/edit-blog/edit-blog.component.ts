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
    if (res != null && res !== undefined) {
        console.log(res.data);
        this.date = res.data.createdAt;
        this.category = res.data.category;
        this.title = res.data.title;
        this.content = res.data.content;
      }
  }


  blogId: string ='';
  date: any;
  category: any;
  image: any;
  content: any;
  blogDescription: any;
  title: any;
  access: any;
  blogs=[];


  editBlog(blogId: any)
  {
    this.submitted = true;
    let json={
      blogId : blogId,
      title : this.title,
      category : this.category,
      description : this.content,
    }

    this.blogService.editBlog(json).subscribe(
      (res:any) => {
        if(res.status==200) {
          alert('SUCCESS!! :-)\nBlog updated succefully!');  
        }
      });
  }
  id: string='';
  sendId()
  {
      this.router.navigate(["/profile/"+this.id]);
  }
}
