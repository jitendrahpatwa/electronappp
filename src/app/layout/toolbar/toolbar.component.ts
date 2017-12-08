import { Component, OnInit } from '@angular/core';

import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  routeHomeActive:string = "";
  routeListsActive:string = "";

  constructor(
    public route:ActivatedRoute,
    public router:Router
  ) { 
    
    // console.log(this.router.url,this.router)
    
    

  }

  ngOnInit() { 
  } 

  ngDoCheck(){
    let urls = this.router.url;
    // console.log(urls);
    switch (urls) {
      case "/home":
          this.routeHomeActive = "active"; 
          this.routeListsActive = "";
        break;
      case "/lists":
        this.routeHomeActive = "";
        this.routeListsActive = "active";
        break;
      default:
        this.routeHomeActive = "";
        this.routeListsActive = "";
        break;
    }
  }
 
}
