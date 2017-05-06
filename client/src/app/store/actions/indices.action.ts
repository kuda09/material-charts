import { Action } from '@ngrx/store';
import {type} from "../../util";
import {IIndice} from "../state/indices.state";


export const ActionTypes = {
    ADD_INDICE: type('[Indices] ADD INDICE'),
    ADD_INDICE_SUCCESS: type('[Indices] ADD INDICE SUCCESS'),
    RESET_INDICES: type('[Indices] RESET INDICES'),
    ADD_INDICE_FAILED: type('[Indices] ADD INDICE FAILED'),
    SELECT_INDICE: type('[Indices] SELECT INDICE'),
    REMOVE_INDICE: type('[Indices] REMOVE INDICE'),
    REMOVE_INDICE_SUCCESS: type('[Indices] REMOVE INDICE SUCCESS'),
    REMOVE_INDICE_FAILED: type('[Indices] REMOVE INDICE FAILED'),
}

export class AddIndiceAction implements Action {

    type = ActionTypes.ADD_INDICE;

    constructor(public payload) {}
}
export class AddIndiceSuccessAction implements Action {

    type = ActionTypes.ADD_INDICE_SUCCESS;

    constructor(public payload: IIndice) {}
}
export class AddIndiceFailedAction implements Action {

    type = ActionTypes.ADD_INDICE_FAILED;

    constructor(public payload: IIndice) {}
}
export class RemoveIndiceAction implements Action {

    type = ActionTypes.REMOVE_INDICE;
    constructor(public payload){

    }

}
export class RemoveIndiceSuccessAction implements Action {

    type = ActionTypes.REMOVE_INDICE_SUCCESS;
    constructor(public payload){

    }

}
export class RemoveIndiceFailedAction implements Action {

    type = ActionTypes.REMOVE_INDICE_FAILED;
    constructor(public payload){

    }

}
export class SelectIndiceAction implements Action {

    type = ActionTypes.SELECT_INDICE;

    constructor(public payload: IIndice) {}
}
export class ResetIndicesAction implements Action {

    type = ActionTypes.RESET_INDICES;

    constructor(public payload) {}
}


export type Actions = AddIndiceAction | AddIndiceSuccessAction | AddIndiceFailedAction | RemoveIndiceAction | RemoveIndiceSuccessAction | RemoveIndiceFailedAction | SelectIndiceAction | ResetIndicesAction;


