import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import sha512 from 'js-sha512';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class DatastoreService {

  constructor(
    public http:Http,
    private storage:LocalStorageService,
    private sessionStorage:SessionStorageService,
    private cookieService:CookieService
  ) { 

  }

  setPassphrase(str){
    let token = "Linux-App-Issuer";
    //console.log(token)
    let storeStr = (CryptoJS.AES.encrypt(str,token)).toString();
    console.log(storeStr)
    console.info(this.getPassphrase(storeStr));
  }
  getPassphrase(str){
    let token = "Linux-App-Issuer";
    let fromStorage = str;
    //console.log(fromStorage)
    if(fromStorage == "" || fromStorage == null){
      return "";
    }else{
      let getDecrypt = CryptoJS.AES.decrypt(fromStorage,token);
      let finalStr = "";
      finalStr = getDecrypt.toString(CryptoJS.enc.Utf8);
      return finalStr;
    }
  }


  saveToLocal(name,str){
    let token = "Linux-App-Issuer";
    //console.log(token)
    let storeStr = (CryptoJS.AES.encrypt(str,token)).toString();
    //console.log(storeStr)
    this.storage.store(name,storeStr);
  }

  retrieveFromLocal(name):any{
    let token = "Linux-App-Issuer";
    let fromStorage = this.storage.retrieve(name);
    //console.log(fromStorage)
    if(fromStorage == "" || fromStorage == null){
      return "";
    }else{
      let getDecrypt = CryptoJS.AES.decrypt(fromStorage,token);
      let finalStr = "";
      finalStr = getDecrypt.toString(CryptoJS.enc.Utf8);
      return finalStr;
    }
  }
}
