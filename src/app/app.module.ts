import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared-components/navbar/navbar.component'
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewblogComponent } from './components/newblog/newblog.component';
import { MyprofileComponent } from './shared-components/myprofile/myprofile.component';
import { EditBlogComponent } from './shared-components/edit-blog/edit-blog.component';
import { AboutComponent } from './shared-components/about/about.component';
import { PrivacyComponent } from './shared-components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './shared-components/terms-and-conditions/terms-and-conditions.component';
import { MatCardModule } from '@angular/material/card';

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
    EditBlogComponent,
    AboutComponent,
    PrivacyComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
