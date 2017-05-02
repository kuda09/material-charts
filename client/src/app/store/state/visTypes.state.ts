import {LocalStorageService} from "../../services/local-storage.service";

export interface IVisType {
    id: number;
    name: string;
    description: string;
    icon: string;
    selector?: string;
    options?:{};
}


export interface IVisTypes extends Array<IVisType>{}


export let INITIAL_VISTYPES_STATE: IVisTypes ;


if (LocalStorageService.getItem('VIS-TYPES') !== null) {

    INITIAL_VISTYPES_STATE = LocalStorageService.getItem('VIS-TYPES');

} else {

    INITIAL_VISTYPES_STATE = [];
}