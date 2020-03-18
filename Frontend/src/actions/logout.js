import * as loginConstants from '../constants/index';

export const  actionLogout = () => {
    return{
        type : loginConstants.USER_LOGGED_OUT,
    };
}


