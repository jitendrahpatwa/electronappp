import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent }   from './app.component';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const routes:Routes =  [
    { 
        path: '',  
        component: AuthComponent,
        pathMatch: 'full' 
    }, 
    { 
        path: 'home',  
        component: HomeComponent
    },
    { 
        path: '**', 
        component: AuthComponent
    }
];

@NgModule({
    imports:[ 
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {}