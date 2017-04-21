///<reference path="./node_modules/@types/hapi/index.d.ts"/>
///<reference path="./typings/modules/joi/index.d.ts"/>
///<reference path="./typings/modules/dotenv/index.d.ts"/>


"use strict";

import * as env from "dotenv";
import { server} from "./server";
import {connectToDatabase} from "./connections/db.connection";

env.config();

connectToDatabase(process.env.DATABASE_URL)
    .then(() => {

        new server.Server()
            .registerinErt()
            .registerCors()
            .registerHapiJWT2()
            .enableRoutes()
            .startServer();

    })
    .catch((err) => {

        console.error(`Failed to connect to the database: ${err}`);
    });