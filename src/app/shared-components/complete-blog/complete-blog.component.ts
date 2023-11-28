import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-complete-blog',
  templateUrl: './complete-blog.component.html',
  styleUrls: ['./complete-blog.component.scss']
})
export class CompleteBlogComponent implements OnInit {
  commentsCount: any;
  isLiked: any;
  user: any;
  content: any;
  blogId: string ='';
  likes: any;
  superAccess=false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private blogService:BlogService,
    private commentsService: CommentService
  ) { }
  async ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.blogId = id?id:'';
    });
    await this.getBlog();
  }

  async getBlog(){
    let currentUserId = this.authService.getUser().id;
    await this.blogService.getCompleteBlog(this.blogId).subscribe(
      (res:any) => {
        console.log(res.data);
        this.blogId = res.data.id;
        this.content=res.data.content;
        this.user=res.data.user;
        this.likes = res.data.likes;
        this.comments = res.data.comments;
        this.commentsCount = res.data.comments.length;
        this.isLiked = res.data.liked.some((like:any)=> like.id === currentUserId);
        if(currentUserId == this.user.id) {
          this.superAccess=true;
        }
        console.log(this.superAccess);
        this.comments.forEach((comment:any)  => {
          comment.user.id == currentUserId ? comment.commentOwner=true : comment.commentOwner = false;
        })
        
        console.log(this.comments);
        
      });
    }

  deleteComment(id: string){
      if(confirm("you want to delete the comment ?"))
      { this.commentsService.deleteComment(id).subscribe(async (res:any)=>{
        alert("Comment deleted");
        await this.getBlog();
      },error=>{
        alert("Unable to delete comment");
        this.getBlog();
      });}
  }

  editComment(comment:any)  {
    const updatedComment = prompt('Edit comment:', comment.comment);
    if (updatedComment !== null) {
      let json = {
        comment: updatedComment
      };
      this.commentsService.editComment(comment.id, json).subscribe(
        async (response:any) => {
          if(response.status==200)
            await this.getBlog();    
        });
      }
    }

  comments:any[]=[];
  comment: string | undefined;


  addAComment(){
    console.log(this.blogId);
    if(this.comment != undefined && this.comment != " "){
    const request= {
      comment: this.comment,
    };
    this.commentsService.addComment(this.blogId,request).subscribe(
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

  likeBlog() {
    this.blogService.likeBlog(this.blogId).subscribe(
      async (res: any) => {
        if (res.status == 200) {
          this.isLiked= true;
          await this.getBlog();
        }
      },
      (err: any) => {
        console.error('Error al darle me gusta');
      }
    );
  }

  // likeBlog() {
  //   var element = document.getElementById(id);

  //   let url = "http://localhost:10083/like/like/" + id;
  //   let headers = this.authService.addHeaders();

  //   this.httpClient.get(url, { headers }).subscribe((res) => {
    
  //     // console.log(res);
  //     // var isTrueSet = (res == 'true');

  //     if (res) {
  //       element?.setAttribute("src", this.liked);
  //     } else {
  //       element?.setAttribute("src", this.disliked);
  //     }
  //     // location.reload();

  //     this.getBlog();
  //   },error => {
  //     alert(error.message);
  //   });
  // }
}