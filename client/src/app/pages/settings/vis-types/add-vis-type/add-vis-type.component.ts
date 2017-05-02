import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IApplicationState} from "../../../../store/state/application.state";
import {HttpService} from "../../../../services/http.service";
import {generateUniqueId} from "../../../../util";
import {InstallVisAction} from "../../../../store/actions/visTypes.action";
import {IVisTypes, IVisType} from "../../../../store/state/visTypes.state";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-add-vis-type',
  templateUrl: './add-vis-type.component.html',
  styleUrls: ['./add-vis-type.component.scss']
})
export class AddVisTypeComponent implements OnInit {

  public AddVisTypeForm: FormGroup;
  public visTypes: IVisTypes;
  constructor(
      private dialog: MdDialog,
      private _fb: FormBuilder,
      private store: Store<IApplicationState>,
      private httpService: HttpService
  ) {


    store.select('visTypes')
        .subscribe((visTypes: IVisTypes) => this.visTypes = visTypes)
  }

  ngOnInit() {

    this.AddVisTypeForm = this._fb.group({
      id: [generateUniqueId(), Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
      selector: ['']
    })
  }


  addVisTypes(payload, isValid: boolean) {

    if(isValid){

      this.store.dispatch(new InstallVisAction(payload));
      this.dialog.closeAll();
    }
  }

}
