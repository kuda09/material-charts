///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {tokenValid} from "../../controllers/strategies/auth.basic";
import {retrieveDashboardsController, createDashboardController, updateDashboardController, deleteDashboardController} from "../../controllers/collections/dashboards.controller";
const Boom = require('boom');


export const dashboardsRouter = (server: hapi.Server) => {
    server.route({
        method: "GET",
        path: "/api/collections/dashboards",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;

                retrieveDashboardsController(username)
                    .then(dashboards => reply({dashboards: dashboards}).code(200))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/dashboard",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const dashboard  = request.payload;

                createDashboardController(username, dashboard)
                    .then(dashboards => reply({dashboard: dashboard}).code(201))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "PATCH",
        path: "/api/collections/dashboard",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const dashboard  = request.payload;

                updateDashboardController(username, dashboard)
                    .then(dashboards => reply({dashboard: dashboard}).code(204))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/dashboard/delete",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const dashboard  = request.payload;

                deleteDashboardController(username, dashboard)
                    .then(dashboards => reply({dashboard}).code(202))
                    .catch(err => reply({err: err}));

            }
        }
    });
}