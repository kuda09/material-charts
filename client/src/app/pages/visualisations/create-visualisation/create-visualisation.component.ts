import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IApplication} from "../../../store/state/application.state";
import {IVisTypes} from "../../../store/state/visTypes.state";
import {IIndices} from "../../../store/state/indices.state";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AddVisAction} from "../../../store/actions/vis.action";
import {generateUniqueId} from "../../../util";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-visualisation',
    templateUrl: 'create-visualisation.component.html',
    styleUrls: ['create-visualisation.component.scss']
})
export class CreateVisualisationComponent implements OnInit {

    visTypes: IVisTypes;
    indices: IIndices;
    CreateVisForm: FormGroup;
    type: string;
    tab = 0;

    constructor(private store: Store<IApplication>, private _fb: FormBuilder, private router: Router) {
        store.select('visTypes')
            .subscribe((visTypes: IVisTypes) => {

                this.visTypes = visTypes;
            });

        store.select('indices')
            .subscribe((indices: IIndices) => {

                this.indices = indices;
            })

    }

    ngOnInit() {
        this.CreateVisForm = this._fb.group({
            id: [generateUniqueId(), Validators.required],
            name: ['', Validators.required],
            index_pattern: ['', Validators.required],
            description: [''],
        });
    }


    goToNextStep(vis) {

        if(vis.name) {

            this.type = vis;
        }

        this.tab++;
    }


    createVis(payload, isValid){

        if(isValid){

            payload.type = this.type;

            //set default metrics and buckets
            payload.buckets = [];
            payload.metrics = [];

            this.store.dispatch(new AddVisAction(payload));


        }

    }

}
