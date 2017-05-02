import * as _ from 'lodash';
import {List} from 'immutable';
import {INITIAL_DASHBOARD_STATE, IDashboards, IDashboard} from "../state/dashboards.state";
import {Actions, ActionTypes} from "../actions/dashboards.action";
import {LocalStorageService} from '../../services/local-storage.service';



const saveToLocalStorage = (state, type) => {

    let oldState = LocalStorageService.getItem('USER_STATE');

    oldState[type] = state;

    LocalStorageService.setItem('USER_STATE', oldState);

}


export function dashboardStateReducer(state = INITIAL_DASHBOARD_STATE, action: Actions): IDashboards {

    switch (action.type) {

        case ActionTypes.ADD_DASHBOARD: {

            const dashboard = _.assign({}, {selected: true}, action.payload);

            let newState = List(_.map(state, dashboard => _.assign({}, dashboard, {selected: false})))
                .insert(0, dashboard)
                .toJS();

            saveToLocalStorage(newState, 'dashboards');

            return newState;
        }

        case ActionTypes.REMOVE_DASHBOARD: {

            const dashboardId = action.payload.id;

            const newState = _.filter(state, (dashboard: IDashboard) => dashboardId !== dashboard.id);

            saveToLocalStorage(newState, 'dashboards');

            return newState;
        }

        case ActionTypes.SELECT_DASHBOARD: {

            const currentDashboard = action.payload.id;

            return _.map(state, (dashboard: IDashboard) => {

                dashboard.selected = dashboard.id === currentDashboard;

                return dashboard;
            })
        }


        case ActionTypes.EDIT_DASHBOARD: {

            const _dashboard = action.payload;
            const dashboardId = action.payload.id;

            return  _.map(state, (dashboard: IDashboard) => {

                if(dashboard.id === dashboardId) {

                    dashboard = _dashboard
                }

                return dashboard;
            });
        }

        default: {

            return state;
        }

    }
}

export const _getDashboards = (state: IDashboards) => state;

