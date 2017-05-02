import {type} from "../../util";
import {Action} from "@ngrx/store";

export const ActionTypes = {
    NEW_SEARCH: type('[Search] NEW SEARCH'),
    SEARCH_RESULTS_RECEIVED: type('[Search] SEARCH RESULTS RECEIVED')
}


export class NewSearchAction implements Action {

    type = ActionTypes.NEW_SEARCH;

    constructor(public payload){

    }
}

export class SearchResultsReceivedAction implements Action {

    type = ActionTypes.SEARCH_RESULTS_RECEIVED;

    constructor(public payload){

    }
}


export type Actions = NewSearchAction | SearchResultsReceivedAction;
