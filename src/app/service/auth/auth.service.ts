import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import sha512 from 'js-sha512';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import {  Router, ActivatedRoute } from '@angular/router'; 

import { DatastoreService } from '../datastore/datastore.service';
import 'rxjs/add/operator/map';
import  PouchDB from 'pouchdb';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as Raven from 'raven-js';
import * as html2canvas from 'html2canvas';

import { ToastrService } from 'ngx-toastr';
 
@Injectable()
export class AuthService {
  pdb1:any;
  constructor(
    public http:Http,
    private storage:LocalStorageService,
    private sessionStorage:SessionStorageService,
    private cookieService:CookieService,
    public route:ActivatedRoute,
    public router:Router,
    public datastoreServ:DatastoreService,
    public toastr:ToastrService
  ) { 
    this.pdb1 = new PouchDB("http://45.55.211.36:5984/admin/"); // auth admin
  }


  letIn(email,password){
    this.getAdminAuth(email,password);
  }

  handleError(err:any) : void {
    Raven.captureException(err);
  }

  storeIP(){
    this.http.get("https://freegeoip.net/json/")
    .subscribe(
      d=>{
        // console.info(d)
        let dt = JSON.parse(JSON.stringify(d));
        let dt2 = JSON.parse(dt._body);
        // console.log(dt2,dt2.ip);
        this.datastoreServ.saveToLocal("IssuerAppUserInfo",dt._body);
        // console.log(this.datastoreServ.retrieveFromLocal("IssuerAppUserInfo"));
      },
      e=>{
        // console.log(e);
        this.handleError(e)
      }
    )
  }

  getAdminAuth(email,password){
    let sc = this.pdb1;

    sc.allDocs({include_docs:true})
    .then(
      d=>{
        // console.log(d,d.rows.length)
        d.rows.forEach((value,key) => {
          // console.log(value,key)
          let docemail = value.doc.email;
          let docpass = this.datastoreServ.getPassphrase(value.doc.passphrase);
          if(email == docemail && password == docpass){
            let name = value.doc.name;
            this.datastoreServ.saveToLocal("IssuerAppName",name);
            this.datastoreServ.saveToLocal("IssuerAppEmail",email);
            this.datastoreServ.saveToLocal("IssuerAppPassword",password);
            // console.log("valid",email,password)
            // console.log(this.datastoreServ.getPassphrase(password));
            this.storeIP();
            this.router.navigate(['home']);
          }
          // sc.get(value.id).then(
          //   dd=>{
          //     // if(dd.issueid == 'issue1')
          //     //   console.log(dd);
          //   }
          // )
        });
      },
      e=>{
        // console.log(e)
        this.toastr.error("Not a valid admin",null,{timeOut:2000});
        this.handleError(e);
      }
    );
  }
  
}
