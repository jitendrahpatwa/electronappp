import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';

import { AppRoutingModule } from  './app.routes';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { OrderModule } from 'ngx-order-pipe';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
// import { Ng2Webstorage } from 'ngx-webstorage';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthService } from './service/auth/auth.service';

import { AuthComponent } from './auth/auth.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { ListissuesComponent } from './listissues/listissues.component';
import { LogintoolbarComponent } from './layout/logintoolbar/logintoolbar.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ToolbarComponent,
    HomeComponent,
    ListissuesComponent,
    LogintoolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened:1,
      preventDuplicates:true
    }),
    // Ng2Webstorage,
    NgxQRCodeModule.forRoot(),
    ClipboardModule,
    OrderModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)', 
      backdropBorderRadius: '0px',
      primaryColour: '#c2e9f9', 
      secondaryColour: '#c2e9f9', 
      tertiaryColour: '#c2e9f9',
      fullScreenBackdrop:true
    })
  ],
  providers: [
    AuthService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
