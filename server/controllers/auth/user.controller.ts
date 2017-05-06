///<reference path="../../typings/modules/mongoose/index.d.ts"/>
///<reference path="../../typings/globals/node/index.d.ts"/>
///<reference path="../../typings/modules/passport/index.d.ts"/>
///<reference path="../../typings/modules/bluebird/index.d.ts"/>
///<reference path="../../typings/modules/lodash/index.d.ts"/>
///<reference path="../../typings/modules/hapi/index.d.ts"/>

const mongoose = require('mongoose');
const user = require('./../../schemas/user.schema');

mongoose.Promise = Promise;

const userSchema = mongoose.model('user');

export const createUser = (payload) => {

    return new Promise(function (resolve, reject) {

        let user = new userSchema();
        user.username = payload.username;
        user.name = payload.name;
        user.lastname = payload.lastname;
        user.dashboards = [];
        user.indices = [];
        user.visualisations = [];
        user.setPassword(payload.password);

        userSchema.create(user)
            .then(user => {
                const token = user.generateJWT();

                resolve(token);
            })
            .catch(err => {

                reject(err);
            });

    });

}

export const authenticateUserController = (payload) => {

}



const editUserController = (payload) => {


    return new Promise((resolve, reject) => {

        const user = new userSchema();




    })


}

export const deleteUserController = (req, reply) => {

    const { username } = req.body;

    userSchema.findOneAndRemove({ username: username })
        .then(user => console.log(`User has been deleted ${user}`))
        .catch(err => console.error(`Failed to delete user ${err}`))
}

export const UserController = Object.assign({},
    {
        createUser,
        deleteUserController,
        editUserController
    }
);



