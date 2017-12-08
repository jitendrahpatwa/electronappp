import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';
import { DatastoreService } from '../service/datastore/datastore.service';

import * as _ from 'lodash';
@Component({
  selector: 'app-listissuesbyuser',
  templateUrl: './listissuesbyuser.component.html',
  styleUrls: ['./listissuesbyuser.component.scss'],
  providers:[ProjectService,DatastoreService]
})
export class ListissuesbyuserComponent implements OnInit {
  
  public ngxloading = false;

  appName:string;
  appID:string;
  appImage:string;
  appKey:string;

  applistsusersissues:any;
  showapplistsusersissues:number = 1;

  appDBNAMEURL:string;
  appDBIMAGEURL:string;
  appDBNAMEURLFORUSER:string;

  constructor(
    public projectServ:ProjectService,
    public router:Router,
    public datastoreServ:DatastoreService,
  ) { }

  ngOnInit() {
    this.ngxloading = true;
    this.loadData();
  }

  loadData(){
    
    this.appKey = this.datastoreServ.retrieveFromLocal("IssuerAppProjectKey");
    this.appName = this.datastoreServ.retrieveFromLocal("IssuerAppProjectName");
    this.appID = this.datastoreServ.retrieveFromLocal("IssuerAppProjectID");
    this.appImage = this.datastoreServ.retrieveFromLocal("IssuerAppProjectPic");
    
    this.appDBNAMEURL = this.datastoreServ.retrieveFromLocal("IssuerAppProjectDBNAMEURL");
    this.appDBIMAGEURL = this.datastoreServ.retrieveFromLocal("IssuerAppProjectDBIMAGEURL");

    this.appDBNAMEURLFORUSER = this.datastoreServ.retrieveFromLocal("IssuerAppProjectToSeeUserID");
    this.retrieve();
  }

  retrieve(){
    console.log(this.appDBNAMEURL,this.appDBIMAGEURL,this.appDBNAMEURLFORUSER)
    let dbname = this.appDBNAMEURL;
    let dbimgname = this.appDBIMAGEURL;
    let dbuserid = this.appDBNAMEURLFORUSER;
    this.projectServ.retireveDBNAMEBYUSERDetails(dbname,dbimgname,dbuserid)
    .then(
      d=>{
        console.log(d)
        this.ngxloading = true;
        this.showapplistsusersissues = 0;
      },
      e=>{
        console.log(e)
        this.ngxloading = false;
        this.raiseErrorView();
      }
    ).catch(
      e=>{
        console.log(e)
        this.ngxloading = false;
        this.raiseErrorView();
      }
    );
  }

  raiseErrorView(){
    this.showapplistsusersissues = 1;
    setTimeout(()=>{
      this.showapplistsusersissues = 2;
    },2500);
  }
}
