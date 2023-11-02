import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {


  submitted = false;
  id: string ="";
  userId: string="";
  superAccess: boolean = false;
  username: any;
  name: any;
  email: any;
  firstName:string='';
  lastName:string='';
  bio: any;
  password: any;
  registerForm: any;
  databaseForm: any;
  followersLength: any;
  requests: any;
  followingLength: any;

  server:string='';
  database:string='';
  port:number=0;
  databaseUsername:string='';
  databasePassword:string='';
  databaseType: string='';

  constructor( private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private userService:UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { 
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      bio: ['']
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
  url = "http://localhost:10083/user/getProfile/";

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id=params.get("id");
      this.id=id? id : "";
    });
    this.getUserInfo(this.id);
  }

  getUserInfo(id: string){
    this.userId =id;

    let user:any = this.authService.getUser();
    if(user)  {
      this.username=user.username;
      this.firstName=user.firstName;
      this.lastName=user.lastName;
      this.email=user.email;
      this.bio=user.bio;
      this.password=user.password;
      if(user.database)  {
        this.server=user.database.server;
        this.port=user.database.port;
        this.databaseType=user.database.type;
        this.databaseUsername=user.database.username;
      }
    }
  }

  blogpage()
    {
      this.router.navigate(["/createBlog"]);
    }


    editDatabaseConnection()  {
      let json = {
        server:this.server,
        database:this.database,
        port:this.port.toString(),
        username:this.databaseUsername,
        password:this.databasePassword,
        type:this.databaseType.toLocaleUpperCase()
      };
      console.log(json);
      this.userService.editDatabase(json).subscribe(
        (res:any) => {
          console.log(res);
          
        }
      );
    }


  myblogs()
  {
    this.router.navigate(["/myblogs/"+this.id]);

  }
  oldpassword: undefined;
  newpassword: undefined;
  confirmpassword: undefined;
  changeBoolean=false;
  
  changePassword()
  {
    if(this.oldpassword==undefined || this.newpassword==undefined || this.confirmpassword==undefined)
    {
      alert("fields are left empty");
    }
    else if(this.password==this.oldpassword)
    {
      if(this.newpassword==this.confirmpassword)
      {
        this.password = this.newpassword;
        this.changeBoolean=true;
        alert("Password changes successfully");
      }
      else
      {
        alert("Confirm password does not match");
      }
    }
    else{
      alert("your current password is incorrect");
    }

  }

  validate=false;
  editUser()
  {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  } 
      const headers = this.authService.addHeaders();
      let editUrl = "http://localhost:10083/user/editUser";
      let json={
        username : this.username,
        bio : this.bio,
        password :  this.password,
        email : this.email,
        name :this.name
      }
        if (confirm("Are you sure you want to make the changes?")) {
          this.httpClient.post(editUrl,json,{headers}).subscribe(res=>
            {
              console.log(json);
              alert("changes saved successful")
            });   
      
            this.validate = true;
        
            if(this.changeBoolean==true)
            {
              this.logout();
              this.router.navigate(["/home"]);
            }
        } else {
          alert("ohk");
        }
   
  }

  logoutUrl = "http://localhost:10083/login/logout";
  logout()
    {
  
      if(confirm("you want to logout??"))
      { if(this.service.checkLogin())
        {
          this.authService.logoutService();
          this.httpClient.get(this.logoutUrl).subscribe(res=>
            {
                alert("Logout successful");
            });
         
          this.router.navigate(["/home"]);
        }}
        else{
          alert("ohk");
        }
     
    }


  deactivate = false;
  deactivateUser()
{
  const headers = this.authService.addHeaders();


  let editUrl = "http://localhost:10083/user/deactivateUser";
  let json={
    username : this.username,
      bio : this.bio,
      password :  this.password,
      email : this.email,
  }

  if (confirm("Are you sure you want to deactivate?")) {
    this.httpClient.post(editUrl,json,{headers}).subscribe(res=>
      {
        console.log(json);
      });   
     this.deactivate = true;
      this.changeBoolean=true;
        if(this.deactivate)
        {
          this.logout();
          this.router.navigate(["/home"]);
        }
  } else {
    alert("ohk!!");
  }


 
}

getFollowers() {
  let url = "http://localhost:10083/follow/getFollowers/"+this.id;
  const headers = this.authService.addHeaders();


  this.httpClient.get(url, { headers }).subscribe((res: any) => {
    let arr = [];
    arr = res;
    this.followersLength = arr.length;
  });


}

follow(){
  let url="http://localhost:10083/follow/sendRequest/"+this.id;
  const headers = this.authService.addHeaders();

  this.httpClient.get(url,{headers}).subscribe((res:any)=>{
    if(res){
      // document.getElementById("followButton").innerHTML="Request Sent";
    }
    else{
      alert("Request already Sent");
    }
  });
}

getRequest(){
  let url="http://localhost:10083/follow/getAllRequest";
  const headers = this.authService.addHeaders();


  this.httpClient.get(url,{headers}).subscribe((res:any)=>{
    this.requests=res;
  });
}

acceptRequest(id: string){
  let url="http://localhost:10083/follow/acceptRequest/"+id;
  const headers = this.authService.addHeaders();

  this.httpClient.get(url,{headers}).subscribe((res:any)=>{
    this.getRequest();
    this.getFollowers();
  });

}

rejectRequest(id: string){
  let url="http://localhost:10083/follow/declineRequest/"+id;
  const headers = this.authService.addHeaders();

  this.httpClient.get(url,{headers}).subscribe((res:any)=>{
    this.getRequest();
  });
}

getFollowing(){
  let url="http://localhost:10083/follow/getFollowing/"+this.id;
  const headers = this.authService.addHeaders();

  this.httpClient.get(url,{headers}).subscribe((res:any)=>{
    let arr=[];
    arr=res;
    this.followingLength=arr.length;
  });


}

getFollowingRoute(){
  if(this.superAccess){
    //navigate to see list
    this.router.navigate(["/profile/followers/"+this.userId]);
  }
}

getFollowersRoute(){
  if(this.superAccess){
    //navigate to see list
    this.router.navigate(["/profile/followers/"+this.userId]);
  }
}

}
