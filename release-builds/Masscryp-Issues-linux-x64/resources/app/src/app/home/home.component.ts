import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProjectService]
})
export class HomeComponent implements OnInit {
  
  title:string = "Angular";

  applists:any;
  showapplists:boolean = false;
  public ngxloading = false;
  constructor(
    public projectServ:ProjectService,
    public router:Router
  ) { 

  }
 
  ngOnInit() {
    this.ngxloading = true;
    this.projectServ.getAppsData()
    .then(
      d=>{
        // console.log(d)
        let dt = JSON.parse(JSON.stringify(d));
        if(dt.total_rows > 0){
          let data:any = []; let i = 0;
          _.forEach(dt.rows,(value,key) => {
            // console.log(value,key,Object.keys(value.doc._attachments),value.doc._attachments);
            let img = Object.keys(value.doc._attachments);
            //"appurl""http://45.55.211.36:5984/apps/"
            data.push({
              "rowid":(i+1),
              "appurl":"http://45.55.211.36:5984/apps/"+value.id+"/"+img[key],
              "id":value.id,
              "appname":value.doc.appname,
              "appdescr":value.doc.appdescr
            }) 
          });
          // console.log(data);
          this.applists = data;
          this.showapplists = true;
          this.ngxloading = false;
        }else{
          this.ngxloading = false;
          this.showapplists = false;
        }
      },
      e=>{
        this.ngxloading = false;
        this.showapplists = false;
      }
    ).catch(
      e=>{
        this.ngxloading = false;
        this.showapplists = false;
      }
    );
  }



  findissues(project){
    this.router.navigate(["lists"]);
  }
}
 