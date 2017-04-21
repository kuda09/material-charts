///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
///<reference path="../../typings/modules/lodash/index.d.ts"/>

import * as hapi from "hapi";
import * as _ from "lodash";
import {getIndices} from "../../controllers/elastic-search/query-es.controller";
import {indicesSchema} from "../../schemas/indices.schema";
import {indiceFormatter} from "../../formatters/indices.formatter";


export const indicesRouter = (server: hapi.Server) => {

    server.route({
        method: "POST",
        path: "/api/elasticsearch/indices",
        config: {
            auth: false,
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const payload = request.payload.payload;

                getIndices(payload)
                    .then(
                        res => reply(_.assign({}, { index: payload.index}, indiceFormatter(res))),
                        err => reply(err)
                    )
            },
            validate: {
                payload: {
                    payload: indicesSchema
                }
            }
        }
    });

}