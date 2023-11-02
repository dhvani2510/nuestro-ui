import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  directAbout()  {
    window.open('/about','_new'); 
  }

  directTC() {
    window.open('/terms-and-conditions','_new'); 

  }

  directContact() {}

  directPrivacy() {
    window.open('/privacy','_new'); 
  }
}
