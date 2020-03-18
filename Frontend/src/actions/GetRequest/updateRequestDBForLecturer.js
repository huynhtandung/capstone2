import * as acceptRequest from '../../constants/GetRequest/updateRequestDB';

export const  actionUpdateRequestDBForLecturer = (params = {}) => {
    return{
        type : acceptRequest.UPDATE_REQUEST_DB_FOR_LECTURER,
        payload : {
            params
        }
    };
};