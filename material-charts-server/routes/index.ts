///<reference path="../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {searchRouter} from "./elastic-search/search.route";
import {indicesRouter} from "./elastic-search/indices.route";
import {loginRouter} from "./auth/login.route";
import {homeRouter} from "./home.route";
import {registerRouter} from "./auth/register.route";
import {dashBoardsRouter} from "./collections/dashboards.route";


export class Routes {

    constructor(private serverInstance: hapi.Server) {

    }

    init() {


        debugger;

        searchRouter(this.serverInstance);
        indicesRouter(this.serverInstance);
        loginRouter(this.serverInstance);
        registerRouter(this.serverInstance)
        homeRouter(this.serverInstance);
        dashBoardsRouter(this.serverInstance);

    }
}