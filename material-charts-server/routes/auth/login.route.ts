///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
///<reference path="../../typings/modules/lodash/index.d.ts"/>
import * as hapi from "hapi";
import * as _ from "lodash";
import {loginSchema} from "../../schemas/login.schema";
import {validate} from "../../controllers/strategies/auth.basic";
const BASIC = require("hapi-auth-basic");

export const loginRouter = (server: hapi.Server) => {

    server.register(BASIC, (err) => {

        if(err) throw  err;

        server.auth.strategy('simple', 'basic', { validateFunc: validate})
        server.route({
            method: "GET",
            path: "/api/login",
            config: {
                auth: 'simple',
                handler: (request: hapi.Request, reply: hapi.IReply) => {

                    const authCredentials = request.auth.credentials;

                    if(request.auth.isAuthenticated) {

                        const USER = _.assign({}, {
                            token: authCredentials.token,
                            username: authCredentials.username,
                            name: authCredentials.name,
                            lastname: authCredentials.lastname,
                            indices: authCredentials.indices,
                            visualisations: authCredentials.visualisations,
                            dashboards: authCredentials.dashboards
                        });

                        reply({payload: USER});
                    }

                }
            }
        });

    })

}