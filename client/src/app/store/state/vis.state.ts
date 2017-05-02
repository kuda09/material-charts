import {LocalStorageService} from "../../services/local-storage.service";
import {IVisualisation} from "./interfaces/vis.interface";


export interface IVisualisationsState extends Array<IVisualisation>{}

export let INITIAL_VISUALISATIONS_STATE: IVisualisationsState ;


if (LocalStorageService.getItem('USER_STATE') !== null) {

    INITIAL_VISUALISATIONS_STATE = LocalStorageService.getItem('USER_STATE').visualisations;

} else {

    INITIAL_VISUALISATIONS_STATE = [];
}