///<reference path="../typings/modules/joi/index.d.ts"/>
import * as joi from "joi";

export const indicesSchema = joi.object().keys({
    "index": joi.string().required(),
})
