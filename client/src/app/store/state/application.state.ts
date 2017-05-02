import {IUser} from "./user.state";
import {IVisTypes} from "./visTypes.state";
import {IDashboards} from "./dashboards.state";
import {IVisualisationsState} from "./vis.state";
import {IIndices} from "./indices.state";
import {ISearches} from "./search.state";

export interface IApplicationState {
    user: IUser;
    visTypes: IVisTypes;
    dashboards: IDashboards;
    visualisations: IVisualisationsState;
    indices: IIndices;
    results?: ISearches;
}
