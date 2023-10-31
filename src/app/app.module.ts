import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { LoginComponent } from './login/login.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared-components/navbar/navbar.component'
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewblogComponent } from './components/newblog/newblog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MyprofileComponent } from './shared-components/myprofile/myprofile.component';
import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';
import { CompleteBlogComponent } from './shared-components/complete-blog/complete-blog.component';
import { EditBlogComponent } from './shared-components/edit-blog/edit-blog.component';
// import { MainPageComponent } from './main-page/main-page.component';
// import { MyprofileComponent } from './myprofile/myprofile.component';
// import { NewblogComponent } from './newblog/newblog.component';
// import { MyBlogsComponent } from './my-blogs/my-blogs.component';
// import { EditBlogComponent } from './edit-blog/edit-blog.component';
// import { CompleteBlogComponent } from './complete-blog/complete-blog.component';
// import { FollowerListComponent } from './follower-list/follower-list.component';
// import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    FrontPageComponent,
    FooterComponent,
    NavbarComponent,
    MainPageComponent,
    MyprofileComponent,
    NewblogComponent,
    MyBlogsComponent,
    EditBlogComponent,
    CompleteBlogComponent,
    // FollowerListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
