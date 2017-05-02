///<reference path="../../typings/modules/mongoose/index.d.ts"/>
///<reference path="../../typings/globals/node/index.d.ts"/>
///<reference path="../../typings/modules/passport/index.d.ts"/>
///<reference path="../../typings/modules/bluebird/index.d.ts"/>
///<reference path="../../typings/modules/lodash/index.d.ts"/>
///<reference path="../../typings/modules/hapi/index.d.ts"/>

const mongoose = require('mongoose');
const promise = require('bluebird');
const passport = require('passport');
const user = require('./../../schemas/user.schema');

