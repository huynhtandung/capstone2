import * as announce from '../../constants/GetRequest/index';

export const  actionGetRequestForDean = (params = {}) => {
    return{
        type : announce.GET_REQUEST_FOR_DEAN,
        payload : {
            params
        }
    };
};
export const  actionGetRequestForDeanSuccess = (data) => {
    return{
        type : announce.GET_REQUEST_FOR_DEAN_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetRequestForDeanFail = (error) => {
    return{
        type : announce.GET_REQUEST_FOR_DEAN_FAIL,
        payload : {
            error
        }
    };
}


