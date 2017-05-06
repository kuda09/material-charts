/// <reference path="../../typings/modules/chai/index.d.ts" />
/// <reference path="../../typings/globals/faker/index.d.ts" />


import { UserController} from "./user.controller";
import {expect, assert} from "chai";
import * as faker from "faker";
import 'mocha';




describe("User Controller",  () => {

    it("createUser() should create a user", () => {

        const fakerUser = {
            username: faker.internet.email(),
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            password: faker.internet.password()
        }

        const result = UserController.createUser(fakerUser)
        .then(token => {

            assert.typeOf(token, "string");
        })

    
    })
})

