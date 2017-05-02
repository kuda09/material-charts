import {LocalStorageService} from "../../services/local-storage.service";

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


export interface IIndices extends Array<IIndice>{}

export let  INITIAL_INDICE_STATE:IIndices;

if (LocalStorageService.getItem('USER_STATE') !== null) {

    //console.log(LocalStorageService.getItem('USER_STATE'));

    INITIAL_INDICE_STATE = LocalStorageService.getItem('USER_STATE').indices;


} else {

    INITIAL_INDICE_STATE = [];

}