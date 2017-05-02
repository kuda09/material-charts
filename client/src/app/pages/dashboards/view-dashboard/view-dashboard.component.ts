import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IApplicationState} from "../../../store/state/application.state";
import {ActivatedRoute} from "@angular/router";
import {IDashboards, IDashboard} from "../../../store/state/dashboards.state";
import * as _ from 'lodash';

@Component({
    selector: 'app-view-dashboard',
    templateUrl: 'view-dashboard.component.html',
    styleUrls: ['view-dashboard.component.scss']
})
export class ViewDashboardComponent implements OnInit {

    id: number;
    dashboards: IDashboards;
    dashboard: IDashboard;

    constructor(private store: Store<IApplicationState>,
                private route: ActivatedRoute) {
        route.params
            .subscribe(params => this.id = params['id']);

    }

    ngOnInit() {

        this.store.select('dashboards')
            .subscribe((dashboards: IDashboards) => {
                this.dashboards = dashboards;
                this.dashboard = _.filter(dashboards, (dashboard: IDashboard) => dashboard.id === this.id)[0];
            })

    }

}
