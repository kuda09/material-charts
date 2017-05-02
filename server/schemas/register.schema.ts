///<reference path="../typings/modules/joi/index.d.ts"/>
import * as joi from "joi";

export const registerSchema = joi.object().keys({
    "username": joi.string().required().email(),
    "name": joi.string().required(),
    "lastname": joi.string().required(),
    "password": joi.string().required()
})
