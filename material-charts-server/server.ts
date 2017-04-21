///<reference path="./node_modules/@types/hapi/index.d.ts"/>
///<reference path="./typings/modules/joi/index.d.ts"/>
///<reference path="./typings/modules/dotenv/index.d.ts"/>

"use strict";

import * as hapi from "hapi";
import * as env from "dotenv";
import {Routes} from "./routes/index";

env.config();

class Server {

    server: hapi.Server;

    constructor() {

        this.server = new hapi.Server();
        this.server.connection({port: process.env.API_PORT, host: process.env.ES_HOST});
    }


    registerCors() {

        this.server.register({
            register: require('hapi-cors'),
            options: {
                origins: ['http://localhost:4210']
            }
        }, (err) => {

            if (err) {

                throw  err;
            }
        });


        return this;
    }


    registerinErt() {

        this.server.register(require('inert'), (err) => {

            if (err) {

                throw err;
            }

        });

        return this;
    }

    registerHapiJWT2 () {

        this.server.register(require('hapi-auth-jwt2'), (err) => {

            if (err) {
                throw  err;
            }
        });


        return this;

    }


    enableRoutes() {

        new Routes(this.server).init();
        return this;
    }


    startServer() {

        this.server.start(err => {
            if (err) throw err;
            console.log(`Server up and running at :${this.server.info.uri}`);
        })

    }
}


export const server = Object.assign({}, {Server});




