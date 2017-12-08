import { Injectable } from '@angular/core';
import { Http, Response, HttpModule }  from '@angular/http';
import 'rxjs/add/operator/map';
import  PouchDB from 'pouchdb';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as Raven from 'raven-js';
import * as html2canvas from 'html2canvas';

import { DatastoreService } from '../datastore/datastore.service';

@Injectable()
export class ProjectService {

  pdb1:any;
  pdb2:any;

  constructor(
    public http:Http,
    public datastoreServ:DatastoreService
  ) {
    this.pdb1 = new PouchDB("http://45.55.211.36:5984/apps/"); // listing apps
    this.pdb2 = new PouchDB("http://45.55.211.36:5984/list/");
  }

  handleError(err:any) : void {
    Raven.captureException(err);
  }

  getAppsData(){
    return new Promise((resolve,reject)=>{
      this.pdb1.allDocs({include_docs: true}).then( (doc) => {
        // for (var i in doc) {
        //   if(doc.rows[i].key="abcd@mail.com"){
            // console.log(doc);
            resolve(doc)
        //   }
        // }
        
      });
    })
  }

  getIP(){
    console.log(localStorage.getItem("dummyuserinfo"))
  }

  
  retireveDBNAMEDetails(dbname){
    return new Promise((resolve,reject)=>{
      
      let sc = new PouchDB(this.datastoreServ.retrieveFromLocal("IssuerAppStoreLocation")+dbname);
      
      sc.allDocs({include_docs:false})
      .then(
        d=>{
          // console.log(d,d.rows.length)
          // d.rows.forEach((value,key) => {
          //   console.log(value,key)
            
          // });
          resolve(d.rows);
        },
        e=>{
          // console.log(e)
          reject(e);
          this.handleError(e);
        }
      );
    })
  }


  retireveDBNAMEBYUSERDetails(dbname,dbimgname,dbuserid){
    // console.log(dbname,dbimgname,dbuserid)
    return new Promise((resolve,reject)=>{
      
      let sc = new PouchDB(this.datastoreServ.retrieveFromLocal("IssuerAppStoreLocation")+dbname);
      
      sc.get(dbuserid)
      .then(
        d=>{
          // console.log(d,d.rows.length)
          // d.rows.forEach((value,key) => {
          //   console.log(value,key)
            
          // });
          resolve(d);
        },
        e=>{
          // console.log(e)
          reject(e);
          this.handleError(e);
        }
      );
    })
  }




  //////////////////////////////////////////////////////////////////////////////////////////////////

  letsIssuing(id,page,func,description){
    this.http.get("https://freegeoip.net/json/")
    .subscribe(
      d=>{
        console.info(d)
        let dt = JSON.parse(JSON.stringify(d));
        let dt2 = JSON.parse(dt._body);
        console.log(dt2,dt2.ip);
        localStorage.setItem("dummyuserinfo",dt._body)
        this.updateIssue(id,page,func,description);
        this.getIP();
      },
      e=>{
        console.log(e);
        this.updateIssue(id,page,func,description);
      }
    )
  }
  updateIssue(id,page,func,description){

    let userinfo = JSON.parse(localStorage.getItem("dummyuserinfo"));

    this.pdb2.get(id).then((arr) =>{
      console.log("then1",arr);

      var list = arr.issuelist;
      var getcount = arr.issuescount;
      // console.log("issue",list);
      // if(list == null || list == undefined || list == ""){
      //   let d = [];
      //   d.push(list)
      //   let c = getcount+1;
      //   d.push({
      //     _id:'issue'+c,
      //     data:{
      //       tracker:'Issue tracker'+c+' in page',
      //       timestamp: new Date()
      //     }
      //   });
      //   arr.issuelist = d;
      //   arr.issuescount = c;
      //   return this.pdb.put(arr);  
      // }else{
        console.log("else",list)
        let d = list;
        let c = getcount+1;
        let issueid ='issue'+c; 
        // d.push(list)
        d.push({
          _id:issueid,
          data:{
            tracker:'Issue tracker'+c+' in page',
            timestamp: new Date(),
            ip:userinfo.ip,
            country:userinfo.country_name,
            city:userinfo.city,
            time_zone:userinfo.time_zone,
            latitude:userinfo.latitude,
            longitude:userinfo.longitude,
            page:page,
            schema:func,
            description:description
          },
          momento:moment().unix()
        });
        arr.issuelist = d;
        arr.issuescount = c;
        this.saveinScreenCast(issueid,id);
        return this.pdb2.put(arr);
      // }
      
    })
    // .then( (configDoc) =>{
    //   // console.log("then",configDoc)
    //   // sweet, here is our configDoc
    // })
    .catch((err) =>{
      console.log("catch",err)
      // handle any errors
      this.insertAtFirstEntry(id,page,func,description);
    });
  }
  insertAtFirstEntry(id,page,func,description){   
    let userinfo = JSON.parse(localStorage.getItem("dummyuserinfo"));
    let issueid = 'issue'+1;
    let doc = {
      _id:id,
      issuescount:1,
      issuelist:[{
        _id:issueid,
        data:{
          tracker:'Issue tracker'+'1'+' in page',
          timestamp: new Date(),
          ip:userinfo.ip,
          country:userinfo.country_name,
          city:userinfo.city,
          time_zone:userinfo.time_zone,
          latitude:userinfo.latitude,
          longitude:userinfo.longitude,
          page:page,
          schema:func,
          description:description
        },
        momento:moment().unix()
      }]
    }
    this.saveFirstEntry(doc);
    this.saveinScreenCast(issueid,id);
  }
  saveFirstEntry(doc){
    this.pdb2.put(doc).then(
      d =>{
        console.log(d,"recorded issued")
      }
    ).catch((e)=>{
      // console.info("inthen:",e)
      if(e.name == "conflict"){
        console.log("im conflict","call another update")
      }else{
        console.error("error",e)
      }
    });
  }

  saveinScreenCast(issueid,id){
    let castDB = new PouchDB("http://45.55.211.36:5984/listissuesscreen/");
    html2canvas(document.body,{logging:false}).then((canvas)=>{
      // console.log(canvas);

      var getImage = canvas.toDataURL(); // default is png 
      // console.log(getImage)

      castDB.post({
        email:id,
        key:issueid,
        issueid:issueid,
        screen:getImage
      },(err,result)=>{
        if(err){
          console.log("Screen not Captured")
        }else{
          console.log("ScreenCaptured result:",result)
        }
      })
      .then(d=>{
        console.log("ScreenCaptured:",d)
      });
    })
  }


  getScreen(){
    let sc = new PouchDB("http://45.55.211.36:5984/listissuesscreen/");

    sc.allDocs({include_docs:false})
    .then(
      d=>{
        // console.log(d,d.rows.length)
        d.rows.forEach((value,key) => {
          // console.log(value,key)
          sc.get(value.id).then(
            dd=>{
              if(dd.issueid == 'issue1')
                console.log(dd);
            }
          )
        });
      },
      e=>{
        console.log(e)
      }
    );
  }
}
