import {Component, OnInit, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {IApplicationState} from "../../../../store/state/application.state";
import {SelectIndiceAction} from "../../../../store/actions/indices.action";

@Component({
  selector: 'app-indice-list',
  templateUrl: 'indice-list.component.html',
  styleUrls: ['indice-list.component.scss']
})
export class IndiceListComponent implements OnInit {


  @Input()
  indices;
  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
  }

  selectIndice(indice) {

    this.store.dispatch(new SelectIndiceAction(indice));

  }

}
