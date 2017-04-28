///<reference path="../../typings/modules/lodash/index.d.ts"/>

import {user} from '../../schemas/user.schema';
import {map, filter }from "lodash";

export interface IVisualisation {
    id: number;
    name: string;
    buckets: {}[];
    metrics: {}[];
    index_pattern: {};
    type: {};
    description?: string;
    dashboardAssociations?: number[];
}


const retrieveVisualisations = (username) => {

    return new Promise((resolve, reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }

            return resolve(user.visualisations);
        });

    });
}

const createVisualisation = (username, visualisation: IVisualisation) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }

            user.visualisations = [...user.visualisations, visualisation];

            user.save(user)
                .then(() => resolve(visualisation))
                .catch(err => reject(err))
        });
    });
}

const updateVisualisation = (username, visualisation: IVisualisation) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }
            const visualisations = user.visualisations;

            user.visualisations = map(visualisations, (_visualisation: IVisualisation) => {

                if(_visualisation.id === visualisation.id){

                    _visualisation = visualisation;
                }

                return _visualisation;
            });

            user.save(user)
                .then(() => resolve(visualisation))
                .catch(err => reject(err))
        });
    });
}

const deleteVisualisation = (username, visualisation: IVisualisation) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }
            const visualisations = user.visualisations;

            user.visualisations = filter(visualisations, (_visualisation: IVisualisation) => _visualisation.id !== visualisation.id);

            user.save(user)
                .then(() => resolve(visualisation))
                .catch(err => reject(err))
        });
    });
}


export const VisualisationsController =  Object.assign({}, {
    retrieveVisualisations,
    createVisualisation,
    updateVisualisation,
    deleteVisualisation,
})