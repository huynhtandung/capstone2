import * as announce from '../../constants/GetRequest/index';

export const  actionGetRequestForLecturer = (params = {}) => {
    return{
        type : announce.GET_REQUEST_FOR_LECTURER,
        payload : {
            params
        }
    };
};
export const  actionGetRequestForLecturerSuccess = (data) => {
    return{
        type : announce.GET_REQUEST_FOR_LECTURER_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetRequestForLecturerFail = (error) => {
    return{
        type : announce.GET_REQUEST_FOR_LECTURER_FAIL,
        payload : {
            error
        }
    };
}


