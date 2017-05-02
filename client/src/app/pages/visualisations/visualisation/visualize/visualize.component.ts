import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IVisualisation} from "../../../../store/state/interfaces/vis.interface";

@Component({
    selector: 'app-visualize',
    templateUrl: 'visualize.component.html',
    styleUrls: ['visualize.component.scss']
})
export class VisualizeComponent implements OnInit, OnChanges {


    @Input()
    vis: IVisualisation;

    @Input()
    data: {}[];

    constructor() {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes['data'] || changes['vis']) {

        }
    }

}
