import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import * as fromRoot from "./store/reducers/application.reducer"
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IApplication} from "./store/state/application.state";
import {IUser} from "./store/state/user.state";
import {MdDialog} from "@angular/material";
import {TimePickerComponent} from "./time-picker/time-picker.component";
import 'rxjs/add/operator/take';
import {Router} from "@angular/router";
import {LocalStorageService} from "./services/local-storage.service";
import {RemoveUserAction} from "./store/actions/user.action";
import {TdLoadingService, LoadingMode, LoadingType} from "@covalent/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    public FilterForm: FormGroup
    user$: Observable<IUser>;
    type;



    constructor(private _fb: FormBuilder,
                private router: Router,
                private _loadingService: TdLoadingService,
                private store: Store<IApplication>,
                public dialog: MdDialog) {

        this.user$ = store.select(fromRoot.userSelector);
    }

    ngOnInit() {

        this.FilterForm = this._fb.group({
            query: ['*', Validators.required]
        });
        this._loadingService.create({
            name: 'configFullscreenDemo',
            mode: LoadingMode.Indeterminate,
            type: LoadingType.Linear,
            color: 'accent',
        });

    }

    filter(payload, isValid: boolean) {
    }


    openTimePicker() {

        this.dialog.open(TimePickerComponent);
    }

    signOut() {

        this.store.dispatch(new RemoveUserAction());

        this.router.navigate(["login"]);
    }




}
