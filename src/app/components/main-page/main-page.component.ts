import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  search1: string = '';
  blog: any[] = [];
  displayedBlogs:any[] = [];
  pageSize=10;
  popularBlog: any[] = [];
  followerBlogs: any[] = [];
  categoriess: any[] = [];
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.getBlogs();
    // this.getFollowerBlog();
    // this.getCategory();
  }


  sendId() {
    this.router.navigate(['/profile/' + this.id]);
  }

  blogpage() {
    this.router.navigate(['/createPost']);
  }

  blogsToShowInitially = 10;

    loadMoreBlogs() {
      const currentLength = this.displayedBlogs.length;
      const newBlogs = this.blog.slice(currentLength, currentLength + this.pageSize);
      this.displayedBlogs = this.displayedBlogs.concat(newBlogs);
    }

    encodeNewLine(content:string)  {      
      content = content.replace(/\n/g, '&#10; ');
      console.log(content);
      return content;
    }

  async getBlogs() {
    // const url = 'http://localhost:8081/api/v1/posts';
    const url = 'https://nuestro.iverique.com/api/v1/posts';
    const headers = this.authService.addHeaders();
    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      if(res.status == 200)  {
        this.blog = res.data;
      }
      this.updateDisplayedBlogs();
      console.log(this.displayedBlogs.length);
    });
  }
  private updateDisplayedBlogs() {
    this.displayedBlogs = this.blog.slice(0, this.pageSize);
  }

  likeBlog(blogs:any[], id: any)  {
    const url = 'http://localhost:8080/api/blogs/';
    const headers = this.authService.addHeaders();
    this.httpClient.post(url+'like',{id},{headers:headers}).subscribe(
      (response:any) => {
        if(response.status == 200)  {
          blogs = blogs.map(item => {
            if(item.id == response.data.id) {
              return response.data
            }
            else
              return item;
          })
        }
        console.log(blogs);
      });
  }

  commentBlog(blogs:any, id: any, comment:string)  {
    const url = 'http://localhost:8080/api/comment/';
    const headers = this.authService.addHeaders();
    const request= {
      "comment": comment,
      "id": id
    };
    this.httpClient.post(url+ `add`,request, {headers:headers}).subscribe(
      (response:any) => {
        if(response.status == 200)  {
          console.log("commneted");
          console.log(response);
          if(response.status == 200)  {
            blogs = blogs.map((item:any) => {
              if(item.id == response.data.id) {
                return response.data
              }
              else
                return item;
            })
          }
          blogs.forEach((element:any) => {
            element.showCommentInput = false
          });
          console.log(blogs);
        }
      });
  }

  getFollowerBlog() {
    const url = 'http://localhost:10083/blog/followerBlogs';
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.followerBlogs = res;
      console.log(this.followerBlogs);
    });
  }


  searchinput() {
    const categoryUrl = `https://nuestro.iverique.com/api/v1/posts/search?keyword=${this.search1}`;
    const headers = this.authService.addHeaders();
    this.httpClient.get(categoryUrl, { headers }).subscribe((res: any) => {

      if(res.status == 200)  {
        this.blog = res.data;
        this.updateDisplayedBlogs();
      }
    });
  }

  getCategory() {
    const url = 'http://localhost:10083/blog/getCategory';
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.categoriess = res;
      console.log(this.categoriess);
    });
  }

  toggleCommentInput(blogs:any,index: number) {
    blogs[index].showCommentInput = !blogs[index].showCommentInput;
    console.log(blogs);
    
  }

  showUsers() {
    this.router.navigate(['/userList']);
  }
}
