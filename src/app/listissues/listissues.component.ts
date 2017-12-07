import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';

import * as _ from 'lodash';
@Component({
  selector: 'app-listissues',
  templateUrl: './listissues.component.html',
  styleUrls: ['./listissues.component.css'],
  providers:[ProjectService]
})
export class ListissuesComponent implements OnInit {

  constructor(
    public projectServ:ProjectService,
    public router:Router
  ) {

  }

  ngOnInit() {
    this.projectServ.letsIssuing("18testbcdef@mail.com",location.href,"myFunc()","Some issues have taken");
  }

}
