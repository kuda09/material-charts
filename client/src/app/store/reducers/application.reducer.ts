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
import {IApplication} from "../state/application.state";

const reducers = {
    user: fromUser.userReducer,
    dashboards: fromDashboards.dashboardStateReducer,
    visualisations: fromVis.visualisationsStateReducer,
    visTypes: fromVisTypes.visTypesStateReducer,
    indices: fromIndices.indiceReducer,
    search: fromSearches.searchStateReducer
};

const developmentReducer: ActionReducer<IApplication> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {

    return developmentReducer(state, action);
}


export const getUserState = (state: IApplication) => state.user;
export const getIndicesState = (state: IApplication) => state.indices;
export const getVisState = (state: IApplication) => state.visualisations;
export const getDashboardsState = (state: IApplication) => state.dashboards;


export const userSelector = createSelector(getUserState, fromUser.user);
export const indicesSelector = createSelector(getIndicesState, fromIndices.indices);
export const visualisationsSelector = createSelector(getVisState, fromVis._getVis);
export const dashboardsSelector = createSelector(getDashboardsState, fromDashboards._getDashboards);
