import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import * as d3 from 'd3';
import {convertBucketsToLabelsAndValues, convertBucketsToXsAndYs} from "../../../../util";
import {ChartTypes} from "../../../../chartTypeOptions";


d3.selection.prototype.watchTransition = function (renderWatch) {
    var args = [this].concat([].slice.call(arguments, 1));
    return renderWatch.transition.apply(renderWatch, args);
};

@Component({
    selector: 'app-line-chart',
    templateUrl: 'line-chart.component.html',
    styleUrls: ['line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {


    @Input()
    buckets;
    options;
    data;
    chartBuilder;

    @Input()
    chartState;

    constructor() {
        this.chartBuilder = new ChartTypes();
    }

    ngOnInit() {

        this.options = this.chartBuilder.buildChart(this.chartState);

    }

    ngOnChanges(changes: SimpleChanges): void {


        if (changes['buckets']) {

            this.data = [{key: "active_to", values: convertBucketsToXsAndYs(this.buckets)}];
        }

        if (changes['chartState']) {

            if (this.chartState !== undefined) {

                this.options = this.chartBuilder.buildChart(this.chartState);
            }

        }

    }

    ngOnDestroy(): void {

        this.options = null;
        this.data = null;
    }

}
