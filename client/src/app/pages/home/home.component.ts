import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {IIndices} from "../../store/state/indices.state";
import {Store} from "@ngrx/store";
import {IApplicationState} from "../../store/state/application.state";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  indices$
  constructor(private httpService: HttpService, private store: Store<IApplicationState>) {

    store.select('indices')
        .subscribe((indices: IIndices) => {
          this.indices$ = indices;
        });
  }


  ngOnInit() {

  }

}
