import {Actions, ActionTypes} from "../actions/search.action";
import {ISearch, INITIAL_SEARCH_STATE, ISearches} from "../state/search.state";
import * as _ from 'lodash';


export function searchStateReducer(state = INITIAL_SEARCH_STATE, action: Actions): ISearches {


    switch (action.type){

        case ActionTypes.NEW_SEARCH: {


            const searchTerm = action.payload;

            return [searchTerm];
        }

        case ActionTypes.SEARCH_RESULTS_RECEIVED: {

            const newResults = action.payload;

            return _.map(state, (searchResult: ISearch, index) => {

                if(index === state.length - 1) {

                    return _.assign({}, searchResult, { results: newResults})
                }

                return searchResult;
            })

        }

        default : {

            return state;
        }

    }

}