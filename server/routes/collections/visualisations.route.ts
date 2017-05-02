///<reference path="../../node_modules/@types/hapi/index.d.ts"/>
import * as hapi from "hapi";
import {VisualisationsController} from "../../controllers/collections/visualisations.controller";

export const visualisationsRouter = (server: hapi.Server) => {
    server.route({
        method: "GET",
        path: "/api/collections/visualisations",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;

                VisualisationsController.retrieveVisualisations(username)
                    .then(visualisations => reply({visualisations}).code(200))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/visualisation",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const visualisation  = request.payload;

                VisualisationsController.createVisualisation(username, visualisation)
                    .then(() => reply({visualisation}).code(201))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "PATCH",
        path: "/api/collections/visualisation",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const visualisation  = request.payload;

                VisualisationsController.updateVisualisation(username, visualisation)
                    .then(() => reply({visualisation}).code(202))
                    .catch(err => reply({err: err}));

            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/collections/visualisation/delete",
        config: {
            auth: 'jwt',
            handler: (request: hapi.Request, reply: hapi.IReply) => {

                const username = request.auth.credentials.username;
                const visualisation  = request.payload;

                VisualisationsController.deleteVisualisation(username, visualisation)
                    .then(() => reply({visualisation}).code(202))
                    .catch(err => reply({err: err}));

            }
        }
    });
}