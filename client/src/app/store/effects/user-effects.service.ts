import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import {ActionTypes, LoginSuccessAction, LoginFailedAction} from "../actions/user.action";
import {Auth} from "../../services/auth.service";
import {IApplicationState} from "../state/application.state";
import {LocalStorageService} from "../../services/local-storage.service";
import {MdSnackBar, MdDialog} from "@angular/material";
import {Router} from "@angular/router";


@Injectable()
export class UserEffectsService {

    constructor(private action$: Actions, private auth: Auth, private store: Store<IApplicationState>, private snackbar: MdSnackBar, private router: Router, private dialog: MdDialog) {
    }

    @Effect()
    userLoggedIn$: Observable<Action> = this.action$
        .ofType(ActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return this.auth.login(payload)
                .map(data => this.store.dispatch(new LoginSuccessAction(data)))
                .catch(err => {

                    this.snackbar.open(`Please check your password or username`, 'LOGIN FAILED', {
                        duration: 5000,
                    });

                    this.store.dispatch(new LoginFailedAction(err));
                    return Observable.empty();
                });
        })
        .filter(() => false);

    @Effect()
    userLoggedSuccess$: Observable<Action> = this.action$
        .ofType(ActionTypes.LOGIN_SUCCESS)
        .map(toPayload)
        .switchMap(payload => {

            const token = payload.payload.token;
            LocalStorageService.setItem('es-token', token);
            this.snackbar.open(`Welcome back ${payload.payload.name}`, 'LOGIN SUCCESS', {
                duration: 5000,
            });

            this.dialog.closeAll();

            this.router.navigate(['']);
            return Observable.empty();
        })
        .filter(() => false);
}
