import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('myModal') myModal: ElementRef;

  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }

  submitted = false;
  id: string = '';
  userId: string = '';
  superAccess: boolean = false;
  email: any;
  firstName: string = '';
  lastName: string = '';
  registerForm: any;
  databaseForm: any;
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal
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
        }, 3000);
      });
    } else {
      this.success = false;
      this.alert = true;
      this.alertHeader = 'Error';
      this.alertMessage = 'Something went Wrong!';
      setTimeout(() => {
        this.ajaxCall(this.id);
      }, 3000);
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
              this.firstName = user.firstName;
              this.lastName = user.lastName;
              this.email = user.email;
              if (user.database) {
                console.log(user.database);
                this.database=user.database.database;
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
            this.alert = true;
            this.alertMessage = 'Database Updated successfully!';
            setTimeout(() => {
              this.alert=false;
            }, 3000);
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
  oldpassword: undefined;
  newpassword: undefined;
  confirmpassword: undefined;
  changeBoolean = false;

  deleteUser() {
    this.userService.deleteUser().subscribe(
      (res:any) => {        
        if (res.status == 200) {
            this.alert = true;
            this.alertHeader = 'Profile Deleted successfully!';
            setTimeout(() => {
              this.alert=false;
            },3000);
          this.authService.logoutService();          
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


  confirmAlert: boolean=false;
  confirmButtonText:string='';
  confirmAlerText:string='';
  confirmAction(e:any) {
    this.confirmAlert=false;
    if(e=='Delete') {
      this.deleteUser();
    } 
    else {
      let json = {
        firstName:this.firstName,
        lastName:this.lastName
      };
      this.userService.updateUserProfile(json).subscribe(
        (res: any) => {
          if (res.status == 200) {
              this.alert = true;
              this.authService.setUser(res.data);
              this.alertMessage = 'Profile Updated successfully!';
              setTimeout(() => {
                this.alert=false;
              }, 3000);
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
  }

  closeConfirmAlert() {
    this.confirmAlert = false;
    this.confirmAlerText='';
    this.confirmButtonText='';
  }
  validate = false;
  editUser() {
    this.confirmAlert = true; 
    this.confirmAlerText='Do you want to save th changes?';
    this.confirmButtonText='Save';
  }

  deactivate = false;
  deactivateUser() {
    this.confirmAlerText='Are you sure you want to permenantly dete the account?';
    this.confirmAlert=true;
    this.confirmButtonText='Delete';
  }

  async databaseData() {
    await this.fetchUserProfile();
    // $('#databaseModal').modal('show');
  }
  openEditProfileModal()  {
    // $('#myModal').modal('show');
  }
}
