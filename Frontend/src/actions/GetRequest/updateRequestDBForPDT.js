import * as acceptRequest from '../../constants/GetRequest/updateRequestDB';

export const  actionUpdateRequestDBForPDT = (params = {}) => {
    return{
        type : acceptRequest.UPDATE_REQUEST_DB_FOR_PDT,
        payload : {
            params
        }
    };
};