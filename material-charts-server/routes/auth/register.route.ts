///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
///<reference path="../../typings/modules/lodash/index.d.ts"/>


import * as hapi from "hapi";
import {registerSchema} from "../../schemas/register.schema";
import {createUserController} from "../../controllers/auth/user.controller";

export const registerRouter = (server: hapi.Server) => {

    server.route({
        method: "POST",
        path: "/api/register",
        config: {
            auth: false,
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const payload = request.payload;

                createUserController(payload)
                    .then(token => {
                        reply({token: token});
                    })
                    .catch(err => {
                        reply({err: err});
                    })
            },
            validate: {
                payload: registerSchema
            }
        }
    });

}