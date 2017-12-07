import { Component, OnInit } from '@angular/core';

import { FormGroup,  Validators, FormBuilder } from '@angular/forms';

import {  Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  title = 'app';

  public authform:FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    public route:ActivatedRoute,
    public router:Router,
    public toastr:ToastrService
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
      setTimeout(()=>{
        this.router.navigate(['home']);
      },2500);
    }else{
      this.toastr.error(null,"Invalid form submit. Fields are required.",{timeOut:2500});
    }
  }
}
