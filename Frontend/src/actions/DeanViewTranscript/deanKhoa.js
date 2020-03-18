import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';

export const  actionGetDeanKhoa = (params = {}) => {
    return{
        type : deanViewTranscript.GET_DEAN_KHOA,
        payload : {
            params
        }
    };
};
export const  actionGetDeanKhoaSuccess = (data) => {
    return{
        type : deanViewTranscript.GET_DEAN_KHOA_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanKhoaFail = (error) => {
    return{
        type : deanViewTranscript.GET_DEAN_KHOA_FAIL,
        payload : {
            error
        }
    };
}


