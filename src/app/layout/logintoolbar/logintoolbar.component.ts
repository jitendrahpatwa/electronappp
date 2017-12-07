import { Component, OnInit } from '@angular/core';

import { FormGroup,  Validators, FormBuilder } from '@angular/forms';

import {  Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

import { DatastoreService } from '../../service/datastore/datastore.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-logintoolbar',
  templateUrl: './logintoolbar.component.html',
  styleUrls: ['./logintoolbar.component.scss'],
  providers:[AuthService,DatastoreService]
})
export class LogintoolbarComponent implements OnInit {

    title = 'app';
    year = new Date().getFullYear();
  
    public authform:FormGroup;
  
    constructor(
      public formBuilder:FormBuilder,
      public route:ActivatedRoute,
      public router:Router,
      public toastr:ToastrService,
      public authServ:AuthService,
      public datastoreServ:DatastoreService
    ) { 
      this.authform = this.formBuilder.group({
        email:['',Validators.compose([Validators.required,Validators.email])],
        password:['',Validators.compose([Validators.required,Validators.min(2)])]
      });
    }
  
    ngOnInit() {
    }
  
    makeAuth(){
      if(this.authform.valid){
        console.log(this.authform.value)
        // setTimeout(()=>{
          // this.router.navigate(['home']);
          this.authServ.letIn(this.authform.value.email,this.authform.value.password);
        // },2500);
      }else{
        this.toastr.error(null,"Invalid form submit. Fields are required.",{timeOut:2500});
      }
    }
}
