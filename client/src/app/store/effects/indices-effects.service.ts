import {Injectable} from '@angular/core';

import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {HttpService} from "../../services/http.service";
import {ActionTypes, AddIndiceAction, AddIndiceSuccessAction, AddIndiceFailedAction, RemoveIndiceSuccessAction, RemoveIndiceFailedAction} from "../actions/indices.action";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {IApplication} from "../state/application.state";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";


@Injectable()
export class IndicesEffectsService {

    constructor(private action$: Actions, private httpService: HttpService, private store: Store<IApplication>, private snackbar: MdSnackBar, private router: Router) {
    }


    @Effect()
    retrieveIndices$: Observable<Action> = this.action$
        .ofType(ActionTypes.ADD_INDICE)
        .map(toPayload)
        .switchMap(payload => {

            return this.httpService.retrieveIndices(payload)
                .map(indices => {
                    return this.store.dispatch(new AddIndiceSuccessAction(indices));
                })
                .catch(err => {
                    this.store.dispatch(new AddIndiceFailedAction(err));
                    return Observable.empty();
                });
        })
        .filter(() => false);


    @Effect()
    retrieveIndicesSuccess$: Observable<Action> = this.action$
        .ofType(ActionTypes.ADD_INDICE_SUCCESS)
        .map(toPayload)
        .switchMap(payload => {

            return this.httpService.saveIndices(payload)
                .map(indice => {
                    this.snackbar.open(`Indice added successfully`, 'SUCCESS', {
                        duration: 5000,
                    });
                })
                .catch(() => {

                    this.snackbar.open(`Error adding indice`, 'EROOR', {
                        duration: 5000,
                    });
                    return Observable.empty();
                });
        })
        .filter(() => false);


    @Effect()
    retrieveIndicesFailed$: Observable<Action> = this.action$
        .ofType(ActionTypes.ADD_INDICE_FAILED)
        .map(toPayload)
        .switchMap((payload) => {

            this.snackbar.open(`Error adding indice`, 'ERROR', {
                duration: 5000,
            });

            return Observable.empty();
        })
        .filter(() => false);


    @Effect()
    deleteIndice$: Observable<Action> = this.action$
        .ofType(ActionTypes.REMOVE_INDICE)
        .map(toPayload)
        .switchMap(payload => {

            return this.httpService.deleteIndices(payload)
                .map(indices => {
                    return this.store.dispatch(new RemoveIndiceSuccessAction(indices));
                })
                .catch(err => {
                    this.store.dispatch(new RemoveIndiceFailedAction(err));
                    return Observable.empty();
                });
        })
        .filter(() => false);

    @Effect()
    deleteIndiceSuccess$: Observable<Action> = this.action$
        .ofType(ActionTypes.REMOVE_INDICE_SUCCESS)
        .take(1)
        .map(toPayload)
        .switchMap(() => {

            this.snackbar.open(`Indice removed successfully`, 'SUCCESS', {
                duration: 5000,
            });

            return Observable.empty();
        })
        .filter(() => false);


    @Effect()
    deleteIndiceFailed$: Observable<Action> = this.action$
        .ofType(ActionTypes.REMOVE_INDICE_FAILED)
        .take(1)
        .map(toPayload)
        .switchMap(() => {

            this.snackbar.open(`Failed to remove indice`, 'ERROR', {
                duration: 5000,
            });

            return Observable.empty();
        })
        .filter(() => false);



}
