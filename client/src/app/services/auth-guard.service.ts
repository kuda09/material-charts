import {Injectable} from '@angular/core';
import {Auth} from "./auth.service";
import {Router, CanActivate} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard  implements CanActivate{

  constructor(private auth: Auth ,private router: Router) { }


  canActivate() : Observable<boolean> | boolean{

    if(!this.auth.loggedIn()) {

      return true;
    }
    //this.router.navigate([{outlets: {popup: 'login'}}]);
    this.router.navigate(['login']);
    return false;
  }

}
