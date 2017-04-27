///<reference path="../typings/modules/mongoose/index.d.ts"/>
///<reference path="../typings/modules/jsonwebtoken/index.d.ts"/>
const mongoose = require('mongoose');
import {sign} from "jsonwebtoken";
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    lastname: String,
    name: String,
    dashboards: [],
    visualisations: [],
    indices: [],
    created_at: Date,
    updated_at: Date,
    hash: String,
    salt: String
});
userSchema.pre('save', function (next) {

    const currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at){

        this.created_at = currentDate;
    }

    next();
});
userSchema.methods.setPassword = function (password)  {

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

}
userSchema.methods.validatePassword = function (password) {

    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;

}
userSchema.methods.generateJWT = function () {

    const expiry: any = new Date();

    expiry.setDate(expiry.getDate() + 7);

    return sign({
        _ids: this.id,
        username: this.username,
        exp: expiry.getTime() / 1000
    }, process.env.JWT_SECRET);
}

export const user = mongoose.model('user', userSchema);
