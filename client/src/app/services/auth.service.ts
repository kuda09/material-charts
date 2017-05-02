import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import { AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt";
import {LocalStorageService} from "./local-storage.service";


const authConfig = {
    tokenName: 'es-token',
    tokenGetter: (() => LocalStorageService.getItem('es-token')),
    globalHeaders: [{'Content-Type':'application/json'}]
}

export function AuthHttpServiceFactory (http: Http, options: RequestOptions) {

    return new AuthHttp(new AuthConfig(authConfig), http, options);
}


@Injectable()
export class Auth {

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private http: Http, private authHttp: AuthHttp ) {

    }


    login(payload): Observable<any> {

        const {username, password} = payload;
        const headers = new Headers();

        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        headers.append("Content-Type", "application/json");

        return this.http.get(`http://localhost:3000/api/login`, {headers: headers})
            .map(res => res.json());
    }

    loggedIn() {

        const token = LocalStorageService.getItem('es-token');

        if(token === null) {

            return true;
        }
        return this.jwtHelper.isTokenExpired(token);
    }

}




