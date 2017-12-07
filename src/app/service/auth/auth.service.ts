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
@Injectable()
export class AuthService {

  constructor(
    public http:Http,
    private storage:LocalStorageService,
    private sessionStorage:SessionStorageService,
    private cookieService:CookieService,
    public route:ActivatedRoute,
    public router:Router,
    public datastoreServ:DatastoreService
  ) { 

  }


  letIn(email,password){
    this.datastoreServ.saveToLocal("IssuerAppEmail",email);
    this.datastoreServ.saveToLocal("IssuerAppPassword",password);
    this.router.navigate(['home']);
  }
}
