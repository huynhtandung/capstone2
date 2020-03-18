import * as announce from '../../constants/GetRequest/index';

export const  actionGetRequestForPDT = (params = {}) => {
    return{
        type : announce.GET_REQUEST_FOR_PDT,
        payload : {
            params
        }
    };
};
export const  actionGetRequestForPDTSuccess = (data) => {
    return{
        type : announce.GET_REQUEST_FOR_PDT_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionUpdateRequest = (data) => {
    return{
        type : announce.UPDATE_REQUEST,
        payload : {
            data
        }
    };
};
export const  actionGetRequestForPDTFail = (error) => {
    return{
        type : announce.GET_REQUEST_FOR_PDT_FAIL,
        payload : {
            error
        }
    };
}


