import { Injectable } from '@angular/core';
import {Actions, toPayload, Effect} from "@ngrx/effects";
import {HttpService} from "../../services/http.service";
import {Store} from "@ngrx/store";
import {IApplication} from "../state/application.state";
import {MdSnackBar} from "@angular/material";
import {Observable} from "rxjs";
import {ActionTypes} from "../actions/visTypes.action";
import {Router} from "@angular/router";

@Injectable()
export class VisTypesEffectsService {

  constructor(
      private actions$: Actions,
      private httpService: HttpService,
      private router: Router,
      private store: Store<IApplication>,
      private snackbar: MdSnackBar
  ) {
  }
  @Effect()
  editVisualisationType$: Observable<any> = this.actions$
      .ofType(ActionTypes.EDIT_VIS)
      .map(toPayload)
      .switchMap(payload => {

        this.snackbar.open(`${payload.name} has been updated`, 'EDIT SUCCESS', {
          duration: 5000,
        });

        //this.router.navigate(['/settings/vis-types']);


        return Observable.empty();
      })
      .filter(() => false);

}
