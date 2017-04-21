import {user} from '../../schemas/user.schema';

export const retrieveDashboardsController = (username) => {

    return new Promise((resolve, reject) => {

        user.findOne({username: username}, (err, user) => {

            if(err){

                return reject(err);
            }

            return resolve(user.dashboards);
        })

    });
}