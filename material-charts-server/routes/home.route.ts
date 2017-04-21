///<reference path="../node_modules/@types/hapi/index.d.ts"/>
const path = require("path");


import * as hapi from "hapi";

export const homeRouter = (server: hapi.Server) => {

    server.route({
        method: "GET",
        path: "/",
        handler: (request: hapi.Request, reply: hapi.IReply) => {

            const pathName = path.resolve(__dirname , '../../../dist');
            reply.file(`${pathName}/index.html`);
        }
    });

}