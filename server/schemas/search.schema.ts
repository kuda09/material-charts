///<reference path="../typings/modules/joi/index.d.ts"/>
import * as joi from "joi";

export const searchSchema = joi.object().keys({
    "index": joi.string(),
    "type": joi.string(),
    "search_type": joi.string(),
    "ignore_unavailable": joi.string(),
    "body": joi.object()
})
