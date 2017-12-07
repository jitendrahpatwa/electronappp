import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title:string = "Angular";
  constructor() { }

  ngOnInit() {
  }

}
 