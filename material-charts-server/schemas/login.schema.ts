///<reference path="../typings/modules/joi/index.d.ts"/>
import * as joi from "joi";

export const loginSchema = joi.object().keys({
    "username": joi.string().required().email(),
    "password": joi.string().required()
})
