import * as _ from 'lodash';
import {INITIAL_VISUALISATIONS_STATE, IVisualisations} from "../state/vis.state";
import {Actions, ActionTypes} from "../actions/vis.action";
import {LocalStorageService} from '../../services/local-storage.service';
import {IVisualisation} from "../state/interfaces/vis.interface";



const saveToLocalStorage = (state, type) => {

    let oldState = LocalStorageService.getItem('USER_STATE');

    oldState[type] = state;

    LocalStorageService.setItem('USER_STATE', oldState);

}

export function visualisationsStateReducer(state = INITIAL_VISUALISATIONS_STATE, action: Actions): IVisualisations {

    switch (action.type) {

        case ActionTypes.ADD_VISUALISATION_SUCCESS: {

            const vis = action.payload;

            const newState = [...state, vis];

            saveToLocalStorage(newState, 'visualisations');

            return newState;
        }

        case ActionTypes.REMOVE_VISUALISATION_SUCCESS: {

            const visId = action.payload.id;

            const newState = _.filter(state, (vis: IVisualisation) => visId !== vis.id);

            saveToLocalStorage(newState, 'visualisations');

            return newState;
        }

        case ActionTypes.EDIT_VISUALISATION_SUCCESS: {

            const _vis = action.payload;
            const _visId = action.payload.id;

            const newState = _.map(state, (vis: IVisualisation) => {

                if(vis.id === _visId) {

                    vis = _vis
                }

                return vis;
            });

            saveToLocalStorage(newState, 'visualisations');

            return  newState;
        }

        case ActionTypes.RESET_VISUALISATIONS: {

            return  [];
        }

        default: {

            return state;
        }

    }
}



export const _getVis = (state: IVisualisations) => state;