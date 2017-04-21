///<reference path="../typings/modules/mongoose/index.d.ts"/>
import {connect} from 'mongoose';

export const connectToDatabase = (dataseUrl: string) => {

    return new Promise((resolve , reject) => {

        connect(dataseUrl)
            .connection.on('connected', () => {
            console.log(`Mongoose connected to: ${dataseUrl}`)
            resolve();
        })
            .on('error', err => {
                console.error(`Mongoose connection error: ${err}`);
                reject(err);
            })
            .on('disconnected', () => {
                console.warn(`Mongoose disconnected`);
            });
    });
}
