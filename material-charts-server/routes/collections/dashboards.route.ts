///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {tokenValid} from "../../controllers/strategies/auth.basic";
import {retrieveDashboardsController} from "../../controllers/collections/dashboards.controller";

export const dashBoardsRouter = (server: hapi.Server) => {

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validateFunc: tokenValid,
        verifyOptions: {algorithms: ['HS256']}
    });

    server.auth.default('jwt');

    server.route({
        method: "GET",
        path: "/api/collections/dashboards",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;

                retrieveDashboardsController(username)
                    .then(dashboards => reply({dashboards: dashboards}))
                    .catch(err => reply({err: err}));

            }
        }
    });



}