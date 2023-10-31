import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewblogComponent } from './components/newblog/newblog.component';
import { MyprofileComponent } from './shared-components/myprofile/myprofile.component';
import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';
import { CompleteBlogComponent } from './shared-components/complete-blog/complete-blog.component';
import { EditBlogComponent } from './shared-components/edit-blog/edit-blog.component';
// import { LoginComponent } from './login/login.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { MyprofileComponent } from './myprofile/myprofile.component';
// import { MainPageComponent } from './main-page/main-page.component';
// import { NewblogComponent } from './newblog/newblog.component';
// import { MyBlogsComponent } from './my-blogs/my-blogs.component';
// import { EditBlogComponent } from './edit-blog/edit-blog.component';
// import { CompleteBlogComponent } from './complete-blog/complete-blog.component';
// import { FollowerListComponent } from './follower-list/follower-list.component';
// import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path : '' , component : FrontPageComponent},
 {path : 'login' , component : LoginComponent},
 {path : 'signup' , component : SignUpComponent},
 {path : 'profile/:id' , component : MyprofileComponent},
 {path : 'home' , component : MainPageComponent, canActivate:[AuthGuard]},
 {path : 'createBlog' , component : NewblogComponent},
 {path : 'userList' , component : UserListComponent},
 {path : 'myblogs/:id' , component : MyBlogsComponent},
 {path : 'editblog/:id' , component : EditBlogComponent},
 {path : 'completeBlog/:id' , component : CompleteBlogComponent},
//  {path : 'profile/followers/:id' , component :FollowerListComponent},


 {path:'',redirectTo: "" , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
