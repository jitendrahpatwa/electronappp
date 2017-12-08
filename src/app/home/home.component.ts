import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';
import { DatastoreService } from '../service/datastore/datastore.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProjectService,DatastoreService]
})
export class HomeComponent implements OnInit {
  
  title:string = "Angular";

  applists:any;
  showapplists:number = 1;
  public ngxloading = false;
  constructor(
    public projectServ:ProjectService,
    public router:Router,
    public datastoreServ:DatastoreService,
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
            // console.log(key,img,img[0])
            //"appurl""http://45.55.211.36:5984/apps/"
            data.push({
              "rowid":(i+1),
              "appurl":this.datastoreServ.retrieveFromLocal("IssuerAppStoreLocation")+"apps/"+value.id+"/"+img[0],
              "id":value.id,
              "appkey":value.doc.appkey,
              "appname":value.doc.appname,
              "appdescr":value.doc.appdescr,
              "appdbnameurl":value.doc.appdbname,
              "appdbimagenameurl":value.doc.appdbimagename
            }) 
          });
          // console.log(data);
          this.applists = data;
          this.showapplists = 0;
          this.ngxloading = false;
        }else{
          this.ngxloading = false;
          this.raiseErrorView();
        }
      },
      e=>{
        this.ngxloading = false;
        this.raiseErrorView();
      }
    ).catch(
      e=>{
        this.ngxloading = false;
        this.raiseErrorView();
      }
    );
  }

  raiseErrorView(){
    this.showapplists = 1;
    setTimeout(()=>{
      this.showapplists = 2;
    },2500);
  }


  findissues(project){
    // console.log(project)
    this.datastoreServ.saveToLocal("IssuerAppProjectName",project.appname);
    this.datastoreServ.saveToLocal("IssuerAppProjectKey",project.appkey);
    this.datastoreServ.saveToLocal("IssuerAppProjectID",project.id);
    this.datastoreServ.saveToLocal("IssuerAppProjectPic",project.appurl);
    this.datastoreServ.saveToLocal("IssuerAppProjectDBNAMEURL",project.appdbnameurl);
    this.datastoreServ.saveToLocal("IssuerAppProjectDBIMAGEURL",project.appdbimagenameurl);
    this.router.navigate(["lists"]);
  }
}
 