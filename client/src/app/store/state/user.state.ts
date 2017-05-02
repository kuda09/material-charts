import {LocalStorageService} from '../../services/local-storage.service';

export interface IUser {
    id: number;
    username: string;
    name?: string;
    lastname?: string;
}

export let INITIAL_USER_STATE: IUser;


if (LocalStorageService.getItem('USER_STATE') !== undefined || localStorage.getItem('USER_STATE') !== null ) {

    INITIAL_USER_STATE = LocalStorageService.getItem('USER_STATE');

} else {

    INITIAL_USER_STATE = {
        id: null,
        username: '',
    }

    LocalStorageService.setItem('USER_STATE', INITIAL_USER_STATE);
}

