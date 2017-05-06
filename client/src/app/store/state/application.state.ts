import {IUser} from "./user.state";
import {IVisTypes} from "./visTypes.state";
import {IDashboards} from "./dashboards.state";
import {IVisualisations} from "./vis.state";
import {IIndices} from "./indices.state";
import {ISearches} from "./search.state";

export interface IApplication {
    user: IUser;
    visTypes: IVisTypes;
    dashboards: IDashboards;
    visualisations: IVisualisations;
    indices: IIndices;
}
