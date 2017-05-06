import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import * as _ from  "lodash";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import {ActionTypes, LoginSuccessAction, LoginFailedAction} from "../actions/user.action";
import {Auth} from "../../services/auth.service";
import {IApplication} from "../state/application.state";
import {LocalStorageService} from "../../services/local-storage.service";
import {MdSnackBar, MdDialog} from "@angular/material";
import {Router} from "@angular/router";
import {AddVisSuccessAction, ResetVisualisationsAction} from "../actions/vis.action";
import {AddIndiceSuccessAction, ResetIndicesAction} from "../actions/indices.action";
import {IIndice} from "../state/indices.state";
import {IVisualisation} from "../state/interfaces/vis.interface";


@Injectable()
export class UserEffectsService {

    constructor(private action$: Actions, private auth: Auth, private store: Store<IApplication>, private snackbar: MdSnackBar, private router: Router, private dialog: MdDialog) {
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
            const visualisations = payload.payload.visualisations;
            const indices = payload.payload.indices;
            const dashboards = payload.payload.dashboards;

            //debugger;

            //_.map(visualisations, (visualisation: IVisualisation) => this.store.dispatch(new AddVisSuccessAction(visualisation)));
           // _.map(indices, (indice : IIndice) => this.store.dispatch(new AddIndiceSuccessAction(indice)));
            //_.map(dashboards, dashboard => this.store.dispatch(new AddVisSuccessAction(visualisation)));

            LocalStorageService.setItem('es-token', token);
            this.snackbar.open(`Welcome back ${payload.payload.name}`, 'LOGIN SUCCESS', {
                duration: 5000,
            });

            this.dialog.closeAll();

            this.router.navigate(['/']);
            return Observable.empty();
        })
        .filter(() => false);

    @Effect()
    userLoggedOutSuccess$: Observable<Action> = this.action$
        .ofType(ActionTypes.LOGOUT)
        .map(toPayload)
        .switchMap(() => {

            this.store.dispatch(new ResetVisualisationsAction([]));
            this.store.dispatch(new ResetIndicesAction([]));

            return Observable.empty();
        })
        .filter(() => false);


}
