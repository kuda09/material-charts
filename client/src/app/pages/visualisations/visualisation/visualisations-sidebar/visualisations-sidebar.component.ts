import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IVisualisation} from "../../../../store/state/interfaces/vis.interface";

@Component({
  selector: 'app-visualisations-sidebar',
  templateUrl: 'visualisations-sidebar.component.html',
  styleUrls: ['visualisations-sidebar.component.scss']
})
export class VisualisationsSidebarComponent implements OnInit {


  @Input()
  visTypes: {}[];

  @Output()
  statify = new EventEmitter();
  constructor() {


  }

  ngOnInit() {

  }

  changeVis(vis: IVisualisation) {

    this.statify.emit(vis);
  }



}
