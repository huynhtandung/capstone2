import * as studentGetAllClass from '../constants/studentGetAllClass';

export const  actionStudentGetAllClassSuccess = (data) => {
    return{
        type : studentGetAllClass.STUDENT_GET_ALL_CLASS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionStudentGetAllClassFail = (error) => {
    return{
        type : studentGetAllClass.STUDENT_GET_ALL_CLASS_FAIL,
        payload : {
            error
        }
    };
}


