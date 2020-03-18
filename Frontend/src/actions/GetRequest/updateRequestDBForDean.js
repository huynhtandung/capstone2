import * as acceptRequest from '../../constants/GetRequest/updateRequestDB';

export const  actionUpdateRequestDBForDean = (params = {}) => {
    return{
        type : acceptRequest.UPDATE_REQUEST_DB_FOR_DEAN,
        payload : {
            params
        }
    };
};