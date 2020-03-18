import * as loginConstants from '../constants/login';

export const  actionLogin = (params = {}) => {
    return{
        type : loginConstants.LOGIN,
        payload : {
            params
        }
    };
}


