///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {searchSchema} from "../../schemas/search.schema";
import {queryES} from "../../controllers/elastic-search/query-es.controller";
import {tokenValid} from "../../controllers/strategies/auth.basic";

export const ESSearchRouter = (server: hapi.Server) => {

    server.register(require('hapi-auth-jwt2'), (err) => {

        if (err) {
            throw  err;
        }
    });

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validateFunc: tokenValid,
        verifyOptions: {algorithms: ['HS256']}
    });

    server.auth.default('jwt');

    server.route({
        method: "POST",
        path: "/api/elasticsearch/search",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const payload = request.payload;

                queryES(payload, (err, ESResponse) => {

                    if (err) {

                        return reply(err);
                    }

                    reply(ESResponse);
                })
            },
            validate: {
                payload: searchSchema
            }
        }
    });

}