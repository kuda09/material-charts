import {Actions, ActionTypes} from "../actions/user.action";
import {IUser, INITIAL_USER_STATE} from "../state/user.state";
import {LocalStorageService} from "../../services/local-storage.service";


export function userReducer(state = INITIAL_USER_STATE, action: Actions) : IUser {

    const _user = action.payload;

    switch (action.type) {

        case ActionTypes.LOGIN: {

            if(localStorage.getItem('USER_STATE') !== undefined){

                const userState = LocalStorageService.getItem('USER_STATE');

                return Object.assign({}, userState);
            }

            return Object.assign({}, state);
        }
        case ActionTypes.LOGIN_SUCCESS: {

            const newState = Object.assign({}, _user.payload);
            //side effects but oh well
            LocalStorageService.setItem('USER_STATE', newState);

            return newState;
        }

        case ActionTypes.LOGOUT_SUCCESS: {

            LocalStorageService.removeItem('USER_STATE');
            LocalStorageService.removeItem('es-token');

            return Object.assign({});

        }


        case ActionTypes.EDIT_USER: {

            const newState = Object.assign({}, state, _user);
            LocalStorageService.setItem('USER_STATE', newState);
            return newState
        }

        default: {

            return state;
        }

    }
}


export const user= (user: IUser) => user;
