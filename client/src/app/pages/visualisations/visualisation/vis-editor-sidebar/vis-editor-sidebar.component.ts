import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {getListOfFieldNames, getNumberFields, getStringFields, getDateFields, isFieldDefined} from "../../../../util";
import {updateVis} from "../../../../vis_utils";
import {vkbeautify$} from "../../../../../assets/lib/vkbeautify";
import {IVisualisation} from "../../../../store/state/interfaces/vis.interface";

@Component({
    selector: 'app-vis-editor-sidebar',
    templateUrl: 'vis-editor-sidebar.component.html',
    styleUrls: ['vis-editor-sidebar.component.scss']
})
export class VisEditorSidebarComponent implements OnInit, OnChanges {


    @Input()
    vis: IVisualisation;

    @Input()
    metricIndex;

    @Output()
    visualizer = new EventEmitter();

    @Output()
    statify = new EventEmitter();

    VisStateForm: FormGroup;

    fields: {}[];
    numberFields: {}[];
    stringFields: {}[];
    dateFields: {}[];
    intervals: string[] = ['3h', '1h', '1d',  '1w', '1m', '1y'];

    constructor(private _fb: FormBuilder,) {

    }

    ngOnInit() {

        this.fields = getListOfFieldNames(this.vis.index_pattern);
        this.numberFields = getNumberFields(this.fields);
        this.stringFields = getStringFields(this.fields);
        this.dateFields = getDateFields(this.fields);


        this.VisStateForm = this._fb.group({
            type: this._fb.group({
                name: [this.vis.type.name],
                icon: [this.vis.type.icon],
                id: [this.vis.type.id],
                description:[this.vis.type.description],
                options: [vkbeautify$.json(this.vis.type.options, 4 )]
            }),
            metrics: this._fb.array([]),
            buckets: this._fb.array([]),
            index_pattern: [this.vis.index_pattern]
        });


        this.checkForMetrics(this.vis);
        this.checkForBuckets(this.vis);


    }

    ngOnChanges(changes: SimpleChanges): void {


        this.VisStateForm = this._fb.group({
            type: this._fb.group({
                name: [this.vis.type.name],
                icon: [this.vis.type.icon],
                id: [this.vis.type.id],
                description:[this.vis.type.description],
                options: [vkbeautify$.json(this.vis.type.options, 4 )]
            }),
            metrics: this._fb.array([]),
            buckets: this._fb.array([]),
            index_pattern: [this.vis.index_pattern]
        });


        this.checkForMetrics(this.vis);
        this.checkForBuckets(this.vis);

    }

    checkForMetrics(vis) {

        if(vis.metrics !== undefined && vis.metrics.length > 0) {

            for(let i = 0; i < vis.metrics.length; i++) {

                this.addMetric(vis.metrics[i]);
            }

        } else {

            this.addMetric();
        }

    }

    checkForBuckets(vis) {

        if(vis.buckets !== undefined && vis.buckets.length > 0 ) {

            for(let i = 0; i < vis.buckets.length; i++) {

                this.addBucket(vis.buckets[i]);
            }

        } else {

            this.addBucket();
        }
    }

    onChange(options) {

        if(this.isJSON(options)) {

            this.VisStateForm.controls["type"]["controls"]["options"].setValue(vkbeautify$.json(JSON.parse(options), 4));
            this.VisStateForm.markAsTouched();
        }

    }

    saveVis(payload: IVisualisation) {

        payload.type.options = JSON.parse(<any>payload.type.options);

        console.log(payload);

        this.visualizer.emit(updateVis(this.vis, payload));

    }

    initMetric (metric?) {

        if(metric === undefined) {

            return this._fb.group({
                agg: this._fb.group({
                    aggregration: ['', Validators.required],
                    customLabel: ['']
                })
            });

        }

        return this._fb.group({
            agg: this._fb.group({
                aggregration: [isFieldDefined(metric, 'aggregration'), Validators.required],
                customLabel: [isFieldDefined(metric, 'customLabel')]
            })
        });
    }

    initBucket (bucket?) {

        if(bucket === undefined) {

            return this._fb.group({
                agg: this._fb.group({
                    aggregration: ['', Validators.required],
                    field: ['', Validators.required],
                    interval: ['', Validators.required],
                    customLabel: [''],
                })
            });

        }

        return this._fb.group({
            agg: this._fb.group({
                aggregration: [isFieldDefined(bucket, 'aggregration'), Validators.required],
                field: [isFieldDefined(bucket, 'field'), Validators.required],
                interval: [isFieldDefined(bucket, 'interval'), Validators.required],
                customLabel: [isFieldDefined(bucket, 'customLabel')],
            })
        });

    }

    addBucket(bucket?) {

        const control = <FormArray> this.VisStateForm.controls['buckets'];

        control.push(this.initBucket(bucket));
    }

    addMetric(metric?){

        const control = <FormArray> this.VisStateForm.controls['metrics'];

        control.push(this.initMetric(metric));
    }

    removeBucket(i: number) {

        const control = <FormArray> this.VisStateForm.controls['buckets'];

        control.removeAt(i);

    }

    removeMetric(i: number) {

        const control = <FormArray> this.VisStateForm.controls['metrics'];

        control.removeAt(i);

    }

    toggleMetricState(i){


        console.log(i);

    }

    isJSON(str) {

        try {
            JSON.parse(str)
        } catch (e) {

            return false;
        }

        return true;
    }

}
