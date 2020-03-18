import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';

export const  actionGetDeanClass = (params = {}) => {
    return{
        type : deanViewTranscript.GET_DEAN_CLASS,
        payload : {
            params
        }
    };
};
export const  actionGetDeanClassSuccess = (data) => {
    return{
        type : deanViewTranscript.GET_DEAN_CLASS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanClassFail = (error) => {
    return{
        type : deanViewTranscript.GET_DEAN_CLASS_FAIL,
        payload : {
            error
        }
    };
}


