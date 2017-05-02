import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private dialog: MdDialog) { }

  ngOnInit() {

    const dialogReg = this.dialog.open(LoginDialogComponent);

  }



}
