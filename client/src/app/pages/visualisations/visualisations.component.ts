import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../app/store/reducers/application.reducer"
import {IVisualisations} from "../../store/state/vis.state";
import {RemoveVisAction} from "../../store/actions/vis.action";
import {Observable} from "rxjs";
import {IApplication} from "../../store/state/application.state";
import {TdDialogService} from "@covalent/core";

@Component({
    selector: 'app-visualisations',
    templateUrl: 'visualisations.component.html',
    styleUrls: ['visualisations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualisationsComponent implements OnInit {

    visualisations$: Observable<IVisualisations>;

    constructor(private store: Store<IApplication>, private _dialogService: TdDialogService,) {
    }

    ngOnInit(): void {

        this.visualisations$ = this.store.select(fromRoot.visualisationsSelector);

    }

    deletVis(vis) {

        this._dialogService.openConfirm({
            message: 'Are you want to delete!!',
            disableClose: false,
            title: 'Confirm',
            acceptButton: 'OK',
            cancelButton: 'CANCEL'
        })
            .afterClosed()
            .subscribe((accept: boolean) => {

                if (accept) {
                    this.store.dispatch(new RemoveVisAction(vis));

                }

            })

    }

}
