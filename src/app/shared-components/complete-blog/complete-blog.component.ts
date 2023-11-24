import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-complete-blog',
  templateUrl: './complete-blog.component.html',
  styleUrls: ['./complete-blog.component.scss']
})
export class CompleteBlogComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private blogService:BlogService
  ) { }

  content: any;
  title: any;
    blogId: string ='';
    array:any;
    image: any;
    visited: any;
    blogDescription: any;
    user: any;
    loggedInUser:any;
    date: any;
    likes: any;

    disliked = "https://image.flaticon.com/icons/svg/149/149217.svg";
    liked = "https://image.flaticon.com/icons/svg/148/148836.svg";

    superAccess=false;
  async ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.blogId = id?id:'';
    });
    await this.getBlog();
    this.loggedInUser = this.authService.getUser().id;
  }

  async getBlog(){
    await this.blogService.getCompleteBlog(this.blogId).subscribe(
      ((res:any) => {
        console.log(res.data);
        this.date = res.data.createdAt;

        this.title = res.data.title;
        this.content = res.data.content;
        this.user=res.data.author;
        this.likes = res.data.likesCount;
        this.comments = res.data.comments;
      })
    );
  }

  url = "http://localhost:10083/user/getMyProfile";
  id: string='';


  sendId()
  {
      this.router.navigate(["/profile/"+this.id]);
  }

  deleteComment(id: string){

    let url="http://localhost:8080/api/comment/delete/"+id;
    let headers=this.authService.addHeaders();
      if(confirm("you want to delete the comment ?"))
      { this.httpClient.delete(url,{headers}).subscribe(async (res:any)=>{
        alert("Comment deleted");
        await this.getBlog();
      },error=>{
        alert("Unable to delete comment");
        this.getBlog();
      });}
      else{
        alert("ohk");
      }
   
  }


  comments:any[]=[];
  comment: string | undefined;


  addAComment(){
    console.log(this.blogId);
    

    if(this.comment != undefined && this.comment != " "){
    const url = 'http://localhost:8080/api/comment/';
    const headers = this.authService.addHeaders();
    const request= {
      "comment": this.comment,
      "id": this.blogId
    };
    this.httpClient.post(url+ `add`,request, {headers:headers}).subscribe(
      (response:any) => {
        if(response.status == 200)  {
          console.log("commneted");
          console.log(response);
          if(response.status == 200)  {
            this.getBlog();
            location.reload();
          }
        }
      });

   
    }
    else{
      alert("Comment is empty");
    }
  }

  likedBlogs:any[]=[];


  setLikesAndDislikes() {
    for (let i = 0; i < this.likedBlogs.length; i++) {
      if (this.likedBlogs[i].blog.blogId != null) {
        var element=document.getElementById(this.likedBlogs[i].blog.blogId);
          if(element != null){
            element.setAttribute("src", this.liked);
          }
      }
    }
  }

  getLikedBlogs() {
    let url = "http://localhost:10083/like/getLikedBlogs";
    let headers = this.authService.addHeaders();
    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.likedBlogs = res;
      console.log(this.likedBlogs);
      this.setLikesAndDislikes();
      console.log(res);
    });
  }

  likeBlog(id: string) {
    var element = document.getElementById(id);

    let url = "http://localhost:10083/like/like/" + id;
    let headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res) => {
    
      // console.log(res);
      // var isTrueSet = (res == 'true');

      if (res) {
        element?.setAttribute("src", this.liked);
      } else {
        element?.setAttribute("src", this.disliked);
      }
      // location.reload();

      this.getBlog();
    },error => {
      alert(error.message);
    });
  }
}
