import {Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy} from '@angular/core';
import {formatDailyDate} from "../../../../util";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  buckets;

  @Input()
  chartState;

  metricName: string = '';
  bucketName: string = '';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['buckets']) {

    }

    if(changes['chartState']){

      if(this.chartState['buckets'].length !== 0 ) {

        this.bucketName = this.chartState.buckets[0].agg.customLabel === '' ? this.chartState.buckets[0].agg.field: this.chartState.buckets[0].agg.customLabel;

        this.metricName = this.chartState.metrics[0].agg.customLabel === '' ? this.chartState.metrics[0].agg.field: this.chartState.metrics[0].agg.customLabel;
      }

    }
  }


  formatDate(date){

    return formatDailyDate(date);
  }

  ngOnDestroy(): void {

    this.buckets = [];
  }



}
