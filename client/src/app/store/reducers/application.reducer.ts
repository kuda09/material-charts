import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {combineReducers} from '@ngrx/store';
import * as  fromUser from "./user.reducer";
import * as fromDashboards from "./dashboards.reducer";
import * as fromVis from "./vis.reducer";
import * as fromVisTypes from "./visTypes.reducer";
import * as fromIndices from "./indices.reducer";
import * as fromSearches from "./search.reducer";
import {IApplicationState} from "../state/application.state";

const reducers = {
    user: fromUser.userReducer,
    dashboards: fromDashboards.dashboardStateReducer,
    visualisations: fromVis.visualisationsStateReducer,
    visTypes: fromVisTypes.visTypesStateReducer,
    indices: fromIndices.indiceReducer,
    search: fromSearches.searchStateReducer
};

const developmentReducer: ActionReducer<IApplicationState> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {

    return developmentReducer(state, action);
}


export const getUserState = (state: IApplicationState) => state.user;
export const getIndicesState = (state: IApplicationState) => state.indices;
export const getVisState = (state: IApplicationState) => state.visualisations;
export const getDashboardsState = (state: IApplicationState) => state.dashboards;



export const getUser = createSelector(getUserState, fromUser._getUser);
export const getIndices = createSelector(getIndicesState, fromIndices._getIndices);
export const getVisualisations = createSelector(getVisState, fromVis._getVis);
export const getDashboards = createSelector(getDashboardsState, fromDashboards._getDashboards);
