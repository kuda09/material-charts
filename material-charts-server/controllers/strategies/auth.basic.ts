///<reference path="../../typings/modules/jsonwebtoken/index.d.ts"/>

import {user} from "../../schemas/user.schema";

export const validate = function (request, username, password, done: Function) {

    user.findOne({username: username}, (err, _user) => {

        if(!_user) {

            return done(null, false, {message: 'Incorrect username'});
        }

        if(!_user.validatePassword(password)){
            return done(null, false, {message: 'Incorrect password'});
        }

        const token = _user.generateJWT();
        _user.token = token;
        return done(null, true, _user);

    });
}


export const tokenValid = function (decoded, request, done) {

    user.findOne({username: decoded.username}, (err, _user) => {

        if(!_user) {

            return done(null, false);
        }

        return done(null, true);

    })
}