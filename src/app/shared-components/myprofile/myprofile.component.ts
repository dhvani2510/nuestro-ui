import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  submitted = false;
  id: string = '';
  userId: string = '';
  superAccess: boolean = false;
  username: any;
  name: any;
  email: any;
  firstName: string = '';
  lastName: string = '';
  bio: any;
  password: any;
  registerForm: any;
  databaseForm: any;
  followersLength: any;
  requests: any;
  followingLength: any;
  array: any[] = [];

  alert: boolean = false;
  alertMessage: string = '';
  alertHeader: string = '';
  alertError: boolean = false;
  alertErrorMessage: string = '';
  success: boolean = false;
  blogId: string = '';

  server: string = '';
  database: string = '';
  port: number = 0;
  databaseUsername: string = '';
  databasePassword: string = '';
  databaseType: string = '';
  blogUrl = 'https://nuestro.iverique.com/api/v1/posts/users/';
  content: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private httpClient: HttpClient,
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.databaseForm = this.formBuilder.group({
      server: ['', Validators.required],
      database: ['', Validators.required],
      port: ['', Validators.required],
      databaseUsername: ['', Validators.required],
      databasePassword: ['', Validators.required],
    });
  }

  error = false;
  url = 'http://localhost:10083/user/getProfile/';

  updatePost(blogId: string) {
    this.router.navigate(['/editPost', blogId]);
  }

  deleteBlog(id: string) {
    if (confirm('Are you sure you want to delete the blog?')) {
      this.blogService.deleteBlog(id).subscribe((res: any) => {
        this.alert = true;
        this.alertHeader = 'Success';
        this.alertMessage = 'Blog deleted successfully';
        this.success = true;
        setTimeout(() => {
          this.ajaxCall(this.id);
        }, 5000);
      });
    } else {
      this.success = false;
      this.alert = true;
      this.alertHeader = 'Error';
      this.alertMessage = 'Something went Wrong!';
      setTimeout(() => {
        this.ajaxCall(this.id);
      }, 5000);
    }
  }
  addBlog() {
    this.router.navigate(['/createPost']);
  }

  async ngOnInit() {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    try {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let id = params.get('id');
            this.id = id ? id : '';
            return this.userService.getUserProfile(this.id);
          })
        )
        .subscribe(
          async (res: any) => {
            if (res && res.status === 200) {
              let user = res.data;
              console.log(user);
              this.username = user.username;
              this.firstName = user.firstName;
              this.lastName = user.lastName;
              this.email = user.email;
              this.bio = user.bio;
              this.password = user.password;
              if (user.database) {
                this.server = user.database.server;
                this.port = user.database.port;
                this.databaseType = user.database.type;
                this.databaseUsername = user.database.username;
              }
              let currentUser = this.authService.getUser().id;
              if (currentUser == this.id) {
                this.superAccess = true;
              }
              console.log(this.blogUrl + this.id);

              await this.ajaxCall(this.id);
            }
          },
          (error) => {
            console.error('Error fetching user profile:', error);
            // Handle error as needed
          }
        );
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle other errors as needed
    }
  }

  async ajaxCall(id: string) {
    const headers = this.authService.addHeaders();
    this.httpClient
      .get(this.blogUrl + id, { headers })
      .subscribe((res: any) => {
        console.log('Blogs', res);
        this.array = res.data;
        this.array.forEach((element: any) => {
          this.blogId = element.blogId;
          this.content = element.products;
        });
      });
    if (this.alert) {
      this.alert = false;
      this.alertHeader = '';
      this.alertMessage = '';
    }
  }

  blogpage() {
    this.router.navigate(['/createPost']);
  }

  editDatabaseConnection() {
    let json = {
      server: this.server,
      database: this.database,
      port: this.port.toString(),
      username: this.databaseUsername,
      password: this.databasePassword,
      type: this.databaseType.toLocaleUpperCase(),
    };
    console.log(json);
    this.userService.editDatabase(json).subscribe(
      (res: any) => {
        if (res.status == 200) {
          setTimeout(() => {
            this.alert = true;
            this.alertHeader = 'Databse Updated successfully!';
          }, 5000);
        } else {
          this.alertError = true;
          this.alertErrorMessage = 'Something went wrong!';
        }
      },
      (err: any) => {
        this.alertError = true;
        this.alertErrorMessage = 'Something went wrong!';
      }
    );
  }

  closeErrorAlert() {
    this.alertError = false; // Hide error alert popup
  }

  myblogs() {
    this.router.navigate(['/myPosts/' + this.id]);
  }
  oldpassword: undefined;
  newpassword: undefined;
  confirmpassword: undefined;
  changeBoolean = false;

  changePassword() {
    if (
      this.oldpassword == undefined ||
      this.newpassword == undefined ||
      this.confirmpassword == undefined
    ) {
      alert('fields are left empty');
    } else if (this.password == this.oldpassword) {
      if (this.newpassword == this.confirmpassword) {
        this.password = this.newpassword;
        this.changeBoolean = true;
        alert('Password changes successfully');
      } else {
        alert('Confirm password does not match');
      }
    } else {
      alert('your current password is incorrect');
    }
  }

  confirmAlert: boolean=false;
  confirmAction() {
    let formData = new FormData();
    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    console.log(formData);

    this.userService.updateUserProfile(formData).subscribe(
      (res: any) => {
        if (res.status == 200) {
          setTimeout(() => {
            this.alert = true;
            this.alertHeader = 'Profile Updated successfully!';
          }, 5000);
        } else {
          this.alertError = true;
          this.alertErrorMessage = 'Something went wrong!';
        }
      },
      (err: any) => {
        this.alertError = true;
        this.alertErrorMessage = 'Something went wrong!';
      });
  }

  closeConfirmAlert() {
    this.confirmAlert = false;
  }
  validate = false;
  editUser() {
    this.confirmAlert = true; 
  }

  logoutUrl = 'http://localhost:10083/login/logout';
  logout() {
    if (confirm('you want to logout??')) {
      if (this.authService.checkLogin()) {
        this.authService.logoutService();
        this.httpClient.get(this.logoutUrl).subscribe((res) => {
          alert('Logout successful');
        });

        this.router.navigate(['/home']);
      }
    } else {
      alert('ohk');
    }
  }

  deactivate = false;
  deactivateUser() {
    const headers = this.authService.addHeaders();

    let editUrl = 'http://localhost:10083/user/deactivateUser';
    let json = {
      username: this.username,
      bio: this.bio,
      password: this.password,
      email: this.email,
    };

    if (confirm('Are you sure you want to deactivate?')) {
      this.httpClient.post(editUrl, json, { headers }).subscribe((res) => {
        console.log(json);
      });
      this.deactivate = true;
      this.changeBoolean = true;
      if (this.deactivate) {
        this.logout();
        this.router.navigate(['/home']);
      }
    } else {
      alert('ohk!!');
    }
  }

  getFollowers() {
    let url = 'http://localhost:10083/follow/getFollowers/' + this.id;
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      let arr = [];
      arr = res;
      this.followersLength = arr.length;
    });
  }

  follow() {
    let url = 'http://localhost:10083/follow/sendRequest/' + this.id;
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      if (res) {
        // document.getElementById("followButton").innerHTML="Request Sent";
      } else {
        alert('Request already Sent');
      }
    });
  }

  getRequest() {
    let url = 'http://localhost:10083/follow/getAllRequest';
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.requests = res;
    });
  }

  acceptRequest(id: string) {
    let url = 'http://localhost:10083/follow/acceptRequest/' + id;
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.getRequest();
      this.getFollowers();
    });
  }

  rejectRequest(id: string) {
    let url = 'http://localhost:10083/follow/declineRequest/' + id;
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.getRequest();
    });
  }

  getFollowing() {
    let url = 'http://localhost:10083/follow/getFollowing/' + this.id;
    const headers = this.authService.addHeaders();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      let arr = [];
      arr = res;
      this.followingLength = arr.length;
    });
  }

  getFollowingRoute() {
    if (this.superAccess) {
      //navigate to see list
      this.router.navigate(['/profile/followers/' + this.userId]);
    }
  }

  getFollowersRoute() {
    if (this.superAccess) {
      //navigate to see list
      this.router.navigate(['/profile/followers/' + this.userId]);
    }
  }
}
