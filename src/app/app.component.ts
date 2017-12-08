import { Component } from '@angular/core';

import { DatastoreService } from './service/datastore/datastore.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[DatastoreService]
})
export class AppComponent {
  title = 'app';

  constructor(
    public datastoreServ:DatastoreService
  ){
    this.datastoreServ.saveToLocal("IssuerAppStoreLocation","http://45.55.211.36:5984/");// CouchDB location
  }
}
