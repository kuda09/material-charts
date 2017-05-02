///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {IndicesController} from "../../controllers/collections/indices.controller";

export const indicesRouter = (server: hapi.Server) => {
    server.route({
        method: "GET",
        path: "/api/collections/indices",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;

                IndicesController.retrieveIndices(username)
                    .then(indices => reply({indices}).code(200))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/indice",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const indice  = request.payload;

                IndicesController.createIndice(username, indice)
                    .then(() => reply({indice}).code(201))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "PATCH",
        path: "/api/collections/indice",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const indice  = request.payload;

                IndicesController.updateIndice(username, indice)
                    .then(() => reply({indice}).code(204))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/indice/delete",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const indice  = request.payload;

                IndicesController.deleteIndice(username, indice)
                    .then(() => reply({indice}).code(202))
                    .catch(err => reply({err: err}));

            }
        }
    });
}