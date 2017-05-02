import {Injectable} from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {IApplicationState} from "../state/application.state";
import {Store, Action} from "@ngrx/store";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {ActionTypes, AddVisSuccessAction, AddVisFailedAction, RemoveVisFailedAction, RemoveVisSuccessAction, EditVisSuccessAction, EditVisFailedAction} from "../actions/vis.action";
import {Observable} from "rxjs";
import {IVisualisation} from "../state/interfaces/vis.interface";

@Injectable()
export class VisualisationsEffectsService {

    constructor(private actions$: Actions,
                private httpService: HttpService,
                private router: Router,
                private store: Store<IApplicationState>,
                private snackbar: MdSnackBar) {
    }


    @Effect()
    saveVis$: Observable<Action> = this.actions$
        .ofType(ActionTypes.ADD_VISUALISATION)
        .map(toPayload)
        .switchMap(payload => {

            return this.httpService.saveVis(payload)
                .map(res => {

                    console.log(res.visualisation);

                    return this.store.dispatch(new AddVisSuccessAction(res.visualisation));
                })
                .catch(err => {
                    this.store.dispatch(new AddVisFailedAction(err));
                    return Observable.empty();
                });
        })
        .filter(() => false);

    @Effect()
    saveVisSuccesss$: Observable<Action> = this.actions$
        .ofType(ActionTypes.ADD_VISUALISATION_SUCCESS)
        .map(toPayload)
        .switchMap(payload => {

            this.router.navigate([`visualisation/${payload.id}`]);

            this.snackbar.open(`${payload.name} has been added`, 'SUCCESS', {
                duration: 5000,
            });


            return Observable.empty();
        })
        .filter(() => false);

    @Effect()
    editVis$: Observable<Action> = this.actions$
        .ofType(ActionTypes.EDIT_VISUALISATION)
        .map(toPayload)
        .switchMap(payload => {

            return this.httpService.editVis(payload)
                .map(res => {

                    return this.store.dispatch(new EditVisSuccessAction(res.visualisation));
                })
                .catch(err => {
                    this.store.dispatch(new EditVisFailedAction(err));
                    return Observable.empty();
                });
        })
        .filter(() => false);


    @Effect()
    deleteVisualisation$: Observable<IVisualisation> = this.actions$
        .ofType(ActionTypes.REMOVE_VISUALISATION)
        .map(toPayload)
        .switchMap((payload: IVisualisation) => {

            return this.httpService.deleteVis(payload)
                .map(res => {
                    return this.store.dispatch(new RemoveVisSuccessAction(res.visualisation));
                })
                .catch(err => {
                    this.store.dispatch(new RemoveVisFailedAction(err));
                    return Observable.empty();
                });

        })
        .filter(() => false);

    @Effect()
    deleteVisualisationSuccess$: Observable<IVisualisation> = this.actions$
        .ofType(ActionTypes.REMOVE_VISUALISATION_SUCCESS)
        .map(toPayload)
        .switchMap((payload) => {

            this.snackbar.open(`${payload.name} has been deleted`, 'SUCCESS', {
                duration: 5000,
            });

            return Observable.empty();
        })
        .filter(() => false);
}
