import { Action } from '@ngrx/store';
import {type} from "../../util";
import {IUser} from "../state/user.state";


export const ActionTypes = {
    LOGIN: type('[User] LOGIN'),
    LOGIN_SUCCESS: type('[User] LOGIN SUCCESS'),
    LOGIN_FAILED: type('[User] LOGIN FAILED'),
    LOGOUT: type('[User] RETRIEVE USER'),
    LOGOUT_SUCCESS: type('[User] REMOVE USER'),
    LOGOUT_FAILED: type('[User] LOGOUT FAILER'),
    EDIT_USER: type('[User] EDIT USER')
}

export class LoginAction implements Action {

    type = ActionTypes.LOGIN;

    constructor(public payload: IUser) {}
}

export class LoginSuccessAction implements Action {

    type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload?) {}
}

export class LoginFailedAction implements Action {

    type = ActionTypes.LOGIN_FAILED;

    constructor(public payload?) {}
}

export class RemoveUserAction implements Action {

    type = ActionTypes.LOGOUT_SUCCESS;
    constructor(public payload: IUser){}

}

export class EditUserAction implements Action {

    type = ActionTypes.EDIT_USER;

    constructor(public payload: IUser) {}
}


export type Actions = LoginAction | RemoveUserAction | EditUserAction | LoginFailedAction | LoginSuccessAction;