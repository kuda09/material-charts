///<reference path="../../typings/modules/lodash/index.d.ts"/>

import {user} from '../../schemas/user.schema';
import {map, filter }from "lodash";

interface IIndiceSettingsIndex {
    uuid: string;
}

interface IIndiceSettings {
    index: IIndiceSettingsIndex
}

export interface IIndice {
    aliases: {};
    mappings: {};
    settings:  IIndiceSettings;
    warmers: {};
    index: '';
    selected: boolean;
}


const retrieveIndices = username => {

    return new Promise((resolve, reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }

            return resolve(user.indices);
        });

    });
}

const createIndice = (username, indice: IIndice) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err)
                return reject(err);

            user.indices = [...user.indices, indice];

            user.save(user)
                .then(() => resolve(indice))
                .catch(err => reject(err))
        });
    });
}

const updateIndice = (username, indice: IIndice) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){
                return reject(err);
            }
            const indices = user.indices;

            user.indices = map(indices, (_indice: IIndice) => {

                if(_indice.settings.index.uuid === indice.settings.index.uuid){

                    _indice = indice;
                }

                return _indice;
            });

            user.save(user)
                .then(() => resolve(indice))
                .catch(err => reject(err))
        });
    });
}

const deleteIndice = (username, indice: IIndice) => {

    return new Promise((resolve , reject) => {

        user.findOne({username}, (err, user) => {

            if(err){

                return reject(err);
            }
            const indices = user.indices;

            user.indices = filter(indices, (_indice: IIndice) => _indice.settings.index.uuid !== indice.settings.index.uuid);

            user.save(user)
                .then(() => resolve(indice))
                .catch(err => reject(err))
        });
    });
}


export const IndicesController =  Object.assign({}, {
    retrieveIndices,
    createIndice,
    updateIndice,
    deleteIndice,
})