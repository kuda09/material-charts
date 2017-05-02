import {IVisType} from "../visTypes.state";

export interface IVisualisation {
    id: number;
    name: string;
    buckets: {}[];
    metrics: {}[];
    index_pattern: {};
    type: IVisType;
    description?: string;
    dashboardAssociations?: number[];
}