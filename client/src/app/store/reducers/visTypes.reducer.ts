import * as _ from 'lodash';
import {List} from 'immutable';
import {LocalStorageService} from '../../services/local-storage.service';
import {Actions, ActionTypes} from "../actions/visTypes.action";
import {INITIAL_VISTYPES_STATE, IVisTypes, IVisType} from "../state/visTypes.state";



const saveToLocalStorage = (state) => {

    LocalStorageService.setItem('VIS-TYPES', state);
}


export function visTypesStateReducer(state = INITIAL_VISTYPES_STATE, action: Actions): IVisTypes {

    switch (action.type) {

        case ActionTypes.INSTALL_VIS: {

            const visType = _.assign({}, action.payload);

            let newState = List(state)
                .insert(0, visType)
                .toJS();

            saveToLocalStorage(newState);

            return newState;
        }

        case ActionTypes.UNINSTALL_VIS: {

            const visTypeId = action.payload.id;

            const newState = _.filter(state, (visType: IVisType) => visTypeId !== visType.id);
            saveToLocalStorage(newState);

            return newState;
        }

        case ActionTypes.EDIT_VIS: {

            const _vis = action.payload;
            const _visId = action.payload.id;

            const newState = _.map(state, (vis: IVisType) => {

                if(vis.id === _visId) {

                    vis = _vis
                }

                return vis;
            });

            saveToLocalStorage(newState);

            return  newState;
        }


        default: {

            return state;
        }

    }
}
