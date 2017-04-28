///<reference path="../../typings/modules/lodash/index.d.ts"/>


import {user} from '../../schemas/user.schema';
import {map, filter }from "lodash";

export interface IDashboard {
    id: number;
    name: number;
    description: string;
    selected: boolean
    visTypes: {}[];
}


export const retrieveDashboardsController = (username) => {

    return new Promise((resolve, reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }

            return resolve(user.dashboards);
        });

    });
}

export const createDashboardController = (username, dashboard: IDashboard) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }

            user.dashboards = [...user.dashboards, dashboard];

            user.save(user)
                .then(() => resolve(dashboard))
                .catch(err => reject(err))
        });
    });
}

export const updateDashboardController = (username, dashboard: IDashboard) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }
            const dashboards = user.dashboards;

            user.dashboards = map(dashboards, (_dashboard: IDashboard) => {

                if(_dashboard.id === dashboard.id){

                    _dashboard = dashboard;
                }

                return _dashboard;
            });

            user.save(user)
                .then(() => resolve(dashboard))
                .catch(err => reject(err))
        });
    });
}

export const deleteDashboardController = (username, dashboard: IDashboard) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }
            const dashboards = user.dashboards;

            user.dashboards = filter(dashboards, (_dashboard: IDashboard) => _dashboard.id !== dashboard.id);

            user.save(user)
                .then(() => resolve(dashboard))
                .catch(err => reject(err))
        });
    });
}