import { Action } from '@ngrx/store';
import {type} from "../../util";
import {IVisualisation} from "../state/interfaces/vis.interface";

export const ActionTypes = {
    ADD_VISUALISATION: type('[Visualisation] ADD VISUALISATION'),
    ADD_VISUALISATION_SUCCESS: type('[Visualisation] ADD SUCCES VISUALISATION'),
    ADD_VISUALISATION_FAILED: type('[Visualisation] ADD FAILED VISUALISATION'),
    REMOVE_VISUALISATION: type('[Visualisation] REMOVE VISUALISATION'),
    REMOVE_VISUALISATION_SUCCESS: type('[Visualisation] REMOVE SUCCESS VISUALISATION'),
    REMOVE_VISUALISATION_FAILED: type('[Visualisation] REMOVE FAILED VISUALISATION'),
    EDIT_VISUALISATION: type('[Visualisation] EDIT VISUALISATION'),
    EDIT_VISUALISATION_SUCCESS: type('[Visualisation] EDIT SUCCESS VISUALISATION'),
    EDIT_VISUALISATION_FAILED: type('[Visualisation] EDIT FAILED VISUALISATION'),
}

export class AddVisAction implements Action {

    type = ActionTypes.ADD_VISUALISATION;

    constructor(public payload: IVisualisation){

    }
}
export class AddVisSuccessAction implements Action {

    type = ActionTypes.ADD_VISUALISATION_SUCCESS;

    constructor(public payload: IVisualisation){

    }
}
export class AddVisFailedAction implements Action {

    type = ActionTypes.ADD_VISUALISATION_FAILED;

    constructor(public payload: IVisualisation){

    }
}
export class RemoveVisAction implements Action {

    type = ActionTypes.REMOVE_VISUALISATION;

    constructor(public payload: IVisualisation){

    }
}
export class RemoveVisSuccessAction implements Action {

    type = ActionTypes.REMOVE_VISUALISATION_SUCCESS;

    constructor(public payload: IVisualisation){

    }
}
export class RemoveVisFailedAction implements Action {

    type = ActionTypes.REMOVE_VISUALISATION_FAILED;

    constructor(public payload: IVisualisation){

    }
}
export class EditVisAction implements Action {

    type = ActionTypes.EDIT_VISUALISATION;

    constructor(public payload: IVisualisation){

    }
}
export class EditVisSuccessAction implements Action {

    type = ActionTypes.EDIT_VISUALISATION_SUCCESS;

    constructor(public payload: IVisualisation){

    }
}
export class EditVisFailedAction implements Action {

    type = ActionTypes.EDIT_VISUALISATION_FAILED;

    constructor(public payload: IVisualisation){

    }
}

export type Actions = AddVisAction | RemoveVisAction | EditVisAction | AddVisSuccessAction | AddVisFailedAction | EditVisSuccessAction | EditVisFailedAction | RemoveVisSuccessAction | RemoveVisSuccessAction;
