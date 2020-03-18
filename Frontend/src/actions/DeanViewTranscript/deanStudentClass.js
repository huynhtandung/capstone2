import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';

export const  actionGetDeanStudentClass = (params = {}) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_CLASS,
        payload : {
            params
        }
    };
};
export const  actionGetDeanStudentClassSuccess = (data) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_CLASS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanStudentClassFail = (error) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_CLASS_FAIL,
        payload : {
            error
        }
    };
}


