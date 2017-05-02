import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {getResultsCount, getLabels, convertBucketsToLabelsAndValues} from "../../../../util";
import {ChartTypes} from "../../../../chartTypeOptions";

@Component({
    selector: 'app-pie-chart',
    templateUrl: 'pie-chart.component.html',
    styleUrls: ['pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {

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

            this.data = convertBucketsToLabelsAndValues(this.buckets);
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
