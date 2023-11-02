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
import { AboutComponent } from './shared-components/about/about.component';
import { PrivacyComponent } from './shared-components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './shared-components/terms-and-conditions/terms-and-conditions.component';
// import { FollowerListComponent } from './follower-list/follower-list.component';


const routes: Routes = [
  {path : '' , component : FrontPageComponent},
 {path : 'login' , component : LoginComponent},
 {path : 'signup' , component : SignUpComponent},
 {path : 'profile/:id' , component : MyprofileComponent,canActivate:[AuthGuard]},
 {path : 'home' , component : MainPageComponent, canActivate:[AuthGuard]},
 {path : 'createBlog' , component : NewblogComponent,canActivate:[AuthGuard]},
 {path : 'userList' , component : UserListComponent,canActivate:[AuthGuard]},
 {path : 'myblogs/:id' , component : MyBlogsComponent,canActivate:[AuthGuard]},
 {path : 'editblog/:id' , component : EditBlogComponent,canActivate:[AuthGuard]},
 {path : 'completeBlog/:id' , component : CompleteBlogComponent,canActivate:[AuthGuard]},
 {path : 'about' , component : AboutComponent},
 {path : 'privacy' , component : PrivacyComponent},
 {path:'terms-and-conditions',component:TermsAndConditionsComponent,canActivate:[AuthGuard]},
//  {path : 'profile/followers/:id' , component :FollowerListComponent},


 {path:'',redirectTo: "" , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
