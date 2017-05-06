import * as _ from 'lodash';
import {List} from 'immutable';
import {INITIAL_INDICE_STATE, IIndices, IIndice} from "../state/indices.state";
import {Actions, ActionTypes} from "../actions/indices.action";

import {LocalStorageService} from '../../services/local-storage.service';



const saveToLocalStorage = (state, type) => {

    let oldState = LocalStorageService.getItem('USER_STATE');

    oldState[type] = state;

    LocalStorageService.setItem('USER_STATE', oldState);

}

export function indiceReducer(state = INITIAL_INDICE_STATE, action: Actions) : IIndices {

    switch (action.type) {

        case ActionTypes.ADD_INDICE_SUCCESS: {

            const vis = _.assign({}, {selected: true}, action.payload);

            let newState = List(_.map(state, indice => _.assign({}, indice, {selected: false})))
                .insert(0, vis)
                .toJS();

            saveToLocalStorage(newState, 'indices');

            return newState;
        }

        case ActionTypes.REMOVE_INDICE_SUCCESS: {

            const idcId = action.payload.indice.settings.index.uuid;

            const newState =  _.filter(state, (vis: IIndice) => idcId !== vis.settings.index.uuid);

            saveToLocalStorage(newState, 'indices');

            return newState
        }

        case ActionTypes.SELECT_INDICE: {

            const  currentIdcId = action.payload.settings.index.uuid;

            const newState = _.map(state, (indice: IIndice) => {

                if(indice.settings.index.uuid === currentIdcId) {

                    return _.assign({}, indice ,{ selected: true});

                }
                return _.assign({}, indice ,{ selected: false});

            });

            saveToLocalStorage(newState, 'indices');

            return newState;
        }

        case ActionTypes.RESET_INDICES: {

            return  [];
        }

        default: {

            return state;
        }

    }
}



export const indices = (state: IIndices) => state;


