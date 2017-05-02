///<reference path="../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {ESSearchRouter} from "./elastic-search/search.route";
import {ESIndicesRouter} from "./elastic-search/indices.route";

import {loginRouter} from "./auth/login.route";
import {homeRouter} from "./home.route";
import {registerRouter} from "./auth/register.route";

import {dashboardsRouter} from "./collections/dashboards.route";
import {visualisationsRouter} from "./collections/visualisations.route";
import {indicesRouter} from "./collections/indices.route";


export class Routes {

    constructor(private serverInstance: hapi.Server) {

    }

    init() {

        ESSearchRouter(this.serverInstance);
        ESIndicesRouter(this.serverInstance);

        loginRouter(this.serverInstance);
        registerRouter(this.serverInstance)
        homeRouter(this.serverInstance);

        dashboardsRouter(this.serverInstance);
        visualisationsRouter(this.serverInstance);
        indicesRouter(this.serverInstance);

    }
}