import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs";
import {of} from 'rxjs/observable/of';
import {Store} from "@ngrx/store";
import {ActionTypes, SearchResultsReceivedAction} from "../actions/search.action";
import {HttpService} from "../../services/http.service";
import {IApplicationState} from "../state/application.state";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {MdSnackBar} from "@angular/material";

@Injectable()
export class SearchEffectsService {

    constructor(
        private actions$: Actions,
        private httpService: HttpService,
        private store: Store<IApplicationState>,
        private snackbar: MdSnackBar
    ) {
    }

    @Effect()
    retrieveSearchResults$: Observable<any> = this.actions$
        .ofType(ActionTypes.NEW_SEARCH)
        .debounceTime(300)
        .map(toPayload)
        .switchMap(payload => {
            return this.httpService.search(payload)
                .map(results => this.store.dispatch(new SearchResultsReceivedAction(results)))
                .catch(() => {
                    return Observable.empty();
                });
        })
        .filter(() => false);

}
