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
  }

  ngOnInit() {
  }

}
