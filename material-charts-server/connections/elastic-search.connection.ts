///<reference path="../typings/globals/elasticsearch/index.d.ts"/>
///<reference path="../typings/modules/dotenv/index.d.ts"/>
import * as env from "dotenv";
import * as es from "elasticsearch";

env.config();

export const client: es.Client = new es.Client({
    hosts: [
        process.env.ES_URL
    ]
})