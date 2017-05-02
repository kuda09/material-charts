import {LocalStorageService} from "../../services/local-storage.service";

export interface IDashboard {
    id: number;
    name: number;
    description: string;
    selected: boolean
    visTypes: {}[];
}

export interface IDashboards extends Array<IDashboard>{};

export let INITIAL_DASHBOARD_STATE: IDashboards;


if (LocalStorageService.getItem('USER_STATE') !== null) {

    INITIAL_DASHBOARD_STATE = LocalStorageService.getItem('USER_STATE').dashboards;

} else {

    INITIAL_DASHBOARD_STATE = [];
}