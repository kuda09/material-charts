import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {routing} from "../app.routing";
import {AuthHttp} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
import {AuthHttpServiceFactory} from "../services/auth.service";



@NgModule({
  imports: [
    routing
  ],
  exports: [ RouterModule],
  providers: [
    {
      provide: AuthHttp,
      useFactory: AuthHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  declarations: []
})
export class AuthModule { }
