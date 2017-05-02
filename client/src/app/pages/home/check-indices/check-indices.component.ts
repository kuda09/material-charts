import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-check-indices',
  templateUrl: 'check-indices.component.html',
  styleUrls: ['check-indices.component.scss']
})
export class CheckIndicesComponent implements OnInit {

  @Input()
  indices

  constructor() { }

  ngOnInit() {
  }

}
