import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IApplication} from "../store/state/application.state";
import {getPreviousDayDate, getCurrentDate} from "../util";


const bodyBuilder = require('bodybuilder');

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {


    public TimeRangeForm: FormGroup;

    constructor(private  _fb: FormBuilder,
                private store: Store<IApplication>) {
    }

    ngOnInit() {

        this.TimeRangeForm = this._fb.group({
            gte: [getPreviousDayDate(), Validators.required],
            lte: [getCurrentDate(), Validators.required],
            format: ['dd/MM/yyyy||dd/MM/yyyy', Validators.required]
        });


        const body = bodyBuilder()
            .query('query_string', 'query', '*')
            .sort('timestamp', 'desc')
            .sort([{
                "channel": {
                    "order": "desc"
                }
            }]);

        console.log(body.build());


    }


    setTimer(payload, isValid: boolean) {

        if (isValid) {

            console.log(payload);
        }
    }

}
