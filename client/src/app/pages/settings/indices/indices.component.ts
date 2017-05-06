import {Component, OnInit, OnDestroy} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AddIndiceComponent} from "./add-indice/add-indice.component";
import { Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IIndices} from "../../../store/state/indices.state";
import {IApplication} from "../../../store/state/application.state";
import {RemoveIndiceSuccessAction, RemoveIndiceAction} from "../../../store/actions/indices.action";

@Component({
    selector: 'app-indices',
    templateUrl: 'indices.component.html',
    styleUrls: ['indices.component.scss']
})
export class IndicesComponent implements OnInit, OnDestroy {


    indices$: IIndices;
    sub$;

    constructor(public dialog: MdDialog, private store: Store<IApplication>) {

    }

    ngOnInit(): void {

        this.sub$ = this.store.select('indices')
            .subscribe((indices: IIndices) => {
                this.indices$ = indices;
                this.dialog.closeAll();
            });

    }

    addIndice(): void {
        this.dialog.open(AddIndiceComponent);
    }

    ngOnDestroy(): void {

        this.sub$.unsubscribe()
    }

    removeIndice(indice): void {

        this.store.dispatch(new RemoveIndiceAction(indice));
    }

}
