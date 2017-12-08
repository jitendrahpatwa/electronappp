import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';
import { DatastoreService } from '../service/datastore/datastore.service';

import * as _ from 'lodash';
import * as moment from 'moment';
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
  applistsusersissuesCount:any;
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
    // console.log(this.appDBNAMEURL,this.appDBIMAGEURL,this.appDBNAMEURLFORUSER)
    let dbname = this.appDBNAMEURL;
    let dbimgname = this.appDBIMAGEURL;
    let dbuserid = this.appDBNAMEURLFORUSER;
    this.projectServ.retireveDBNAMEBYUSERDetails(dbname,dbimgname,dbuserid)
    .then(
      d=>{
        // console.log(d)
        this.ngxloading = false;
        // this.applistsusersissues = d;
        this.showapplistsusersissues = 0;

        let dt = JSON.parse(JSON.stringify(d));
        let issueList = dt.issuelist;
        let issueCount = dt.issuescount;
        if(issueCount == 0){
          this.applistsusersissuesCount = 0;
        }else{
          this.applistsusersissuesCount = issueCount;
        }

        let rowid = 0;let arr = [];
        _.forEach(issueList,(value,key)=>{
          // console.log(value,key)
          arr.push({
            rowid:(key+1),
            id:value._id,
            epoch:value.momento,
            time:this.changeDate(value.momento),
            city:value.data.city,
            country:value.data.country,
            description:value.data.description,
            ip:value.data.ip,
            latitude:value.data.latitude,
            longitude:value.data.longitude,
            page:value.data.page,
            schema:value.data.schema,
            time_zone:value.data.time_zone,
            timestamp:value.data.timestamp,
            timestamp2:this.changeTimestamp(value.data.timestamp),
            tracker:value.data.tracker
          })
        });
        this.applistsusersissues = arr;
        // console.log(this.applistsusersissues);
      },
      e=>{
        // console.log(e)
        this.ngxloading = false;
        this.raiseErrorView();
      }
    ).catch(
      e=>{
        // console.log(e)
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

  changeDate(date){
    // return moment(date).format("MMM DD, YYYY");
    let dat = moment.unix(date).fromNow();//.format("MMM Do, YYYY");
    return dat;
  }

  changeTimestamp(date){
    let d = moment(new Date(date)).format("MMM DD, YYYY");
    return d;
  }
}
