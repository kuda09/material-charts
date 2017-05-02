import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {getResultsCount, convertBucketsToLabelsAndValues} from "../../../../util";
import {ChartTypes} from "../../../../chartTypeOptions";

@Component({
    selector: 'app-bar-chart',
    templateUrl: 'bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, OnDestroy {



    @Input()
    buckets;
    options;
    data;

    @Input()
    chartState;
    chartBuilder = new ChartTypes();

    constructor() {

    }

    ngOnInit() {
        this.options = this.chartBuilder.buildChart(this.chartState);

    }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes['buckets']) {

            this.data = [{key: "active_to", values: convertBucketsToLabelsAndValues(this.buckets)}];
        }


        if (changes['chartState'] && this.chartState !== undefined) {

            this.options = this.chartBuilder.buildChart(this.chartState);
        }
    }

    ngOnDestroy(): void {

        this.options = null;
        this.data = null;
    }


}
