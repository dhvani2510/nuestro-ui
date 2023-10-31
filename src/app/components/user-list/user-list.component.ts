import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  user:any[]=[];
  superAccess=false;
  userId:any;
  id:any;
  ngOnInit() {
    this.getUsers();
}

  getUsers(){
    let url="http://localhost:8080/api/user/all";
    let headers=this.authService.addHeaders();

    this.httpClient.get(url,{headers}).subscribe((res:any)=>{
      if(res.status == 200) {
        this.user = res.data
        console.log(this.user);
        this.user = this.user.filter((x:any) => x.id != this.authService.getUser().id);
      }
    });
    
  }

  follow(id:any){
    let url="http://localhost:8080/api/follow/sendRequest/";
    const headers = this.authService.addHeaders();
  
    this.httpClient.get(url+id,{headers}).subscribe((res:any)=>{      
      if(res.status == 200){
        let v = document.getElementById(id);
        if(v != null) {          
          v.innerHTML = res.data.status;
        }
      }
      else{
        alert("Request already Sent");
      }
    });
  }
}
