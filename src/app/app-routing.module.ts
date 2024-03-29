import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './services/auth.guard';
import { NewblogComponent } from './components/newblog/newblog.component';
import { MyprofileComponent } from './shared-components/myprofile/myprofile.component';
import { EditBlogComponent } from './shared-components/edit-blog/edit-blog.component';
import { AboutComponent } from './shared-components/about/about.component';
import { PrivacyComponent } from './shared-components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './shared-components/terms-and-conditions/terms-and-conditions.component';
import { CompleteBlogComponent } from './shared-components/complete-blog/complete-blog.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'profile/:id',
    component: MyprofileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'createPost', component: NewblogComponent, canActivate: [AuthGuard] },
  {
    path: 'completeBlog/:id',
    component: CompleteBlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editPost/:id',
    component: EditBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
