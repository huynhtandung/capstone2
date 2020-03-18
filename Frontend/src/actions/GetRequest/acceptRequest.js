import * as acceptRequest from '../../constants/GetRequest/acceptRequest';

export const  actionAcceptRequest = (params = {}) => {
    return{
        type : acceptRequest.ACCEPT_REQUEST,
        payload : {
            params
        }
    };
};
export const  actionAcceptRequestSuccess = (data) => {
    return{
        type : acceptRequest.ACCEPT_REQUEST_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionAcceptRequestFail = (error) => {
    return{
        type : acceptRequest.ACCEPT_REQUEST_FAIL,
        payload : {
            error
        }
    };
}


