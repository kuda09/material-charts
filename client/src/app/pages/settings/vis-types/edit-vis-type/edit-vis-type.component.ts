import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {IApplication} from "../../../../store/state/application.state";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {IVisTypes, IVisType} from "../../../../store/state/visTypes.state";
import * as _ from 'lodash';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {vkbeautify$} from "../../../../../assets/lib/vkbeautify";
import {EditVisAction} from "../../../../store/actions/visTypes.action";

import 'rxjs/operator/skip';
import 'rxjs/operator/find';

@Component({
    selector: 'app-edit-vis-type',
    templateUrl: './edit-vis-type.component.html',
    styleUrls: ['./edit-vis-type.component.scss']
})
export class EditVisTypeComponent implements OnInit, OnDestroy {


    EditVisTypeForm: FormGroup;
    id: number;
    visTypes$;
    _visType: IVisType;
    /*@ViewChild('editor') editor;*/

    constructor(private store: Store<IApplication>,
                private _fb: FormBuilder,
                private route: ActivatedRoute) {

        route.params
            .subscribe(params => this.id = params['id']);
    }

    ngOnInit() {

        this.visTypes$ = this.store.select('visTypes')
            .subscribe((vis: IVisTypes) => {
                this._visType = _.filter(vis, (_vis: IVisType) => _vis.id === this.id)[0];
            });



        this.EditVisTypeForm = this._fb.group({
            id: [this._visType.id, Validators.required],
            name: [this._visType.name, Validators.required],
            description: [this._visType.description, Validators.required],
            icon: [this._visType.icon, Validators.required],
            selector: [this._visType.selector],
            options: [vkbeautify$.json(this._visType.options, 4)]
        })
    }

    ngOnDestroy() {

        this.visTypes$.unsubscribe();
    }

    onChange(options) {

        if(this.isJSON(options)) {
            this.EditVisTypeForm.controls["options"].setValue(vkbeautify$.json(JSON.parse(options), 4));
            this.EditVisTypeForm.markAsTouched();
        }
    }

    isJSON(str) {

        try {
            JSON.parse(str)
        } catch (e) {

            return false;
        }

        return true;
    }

    saveVisualisation(payload, isValid) {

        payload.options = JSON.parse(payload.options)

        if (isValid) {

            this.store.dispatch(new EditVisAction(payload))
        }

    }

}
