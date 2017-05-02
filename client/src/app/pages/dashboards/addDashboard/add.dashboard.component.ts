import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IApplicationState} from "../../../store/state/application.state";
import {HttpService} from "../../../services/http.service";
import {generateUniqueId} from "../../../util";
import {AddDashboardAction} from "../../../store/actions/dashboards.action";
import {MdDialog} from "@angular/material";


@Component({
    selector: 'add-dashboard-dialog',
    templateUrl: 'addDashboardDialog.html',
    styleUrls: ['add.dashboard.component.scss']
})
export class addDashboardDialog implements OnInit {

    public AddDashboardForm: FormGroup;

    constructor(private _fb: FormBuilder,
    private store: Store<IApplicationState>,
    private httpService: HttpService,
    private dialog: MdDialog) {


    }

    ngOnInit() {

        this.AddDashboardForm = this._fb.group({
            id: [ generateUniqueId(), Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required]
        })
    }

    createDashboard(payload, isValid) {
        if(isValid) {
            this.store.dispatch(new AddDashboardAction(payload));
            this.dialog.closeAll();
        }
    }
}