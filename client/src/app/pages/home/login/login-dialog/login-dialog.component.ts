import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {LoginAction} from '../../../../store/actions/user.action'
import {IApplication} from "../../../../store/state/application.state";


@Component({
    selector: 'app-login-dialog',
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['login-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent implements OnInit {

    public LoginForm: FormGroup;

    constructor(private _fb: FormBuilder,
                private store: Store<IApplication>) {
    }

    ngOnInit() {

        this.LoginForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(payload, isValid: boolean) {

        if (isValid) {

            this.store.dispatch(new LoginAction(payload));

        }

    }

}
