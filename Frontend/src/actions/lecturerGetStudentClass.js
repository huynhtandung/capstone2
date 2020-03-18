import * as lecturerStudentClassConstants from '../constants/lecturerStudentClass';

export const  actionGetLecturerStudentClass = (params = {}) => {
    return{
        type : lecturerStudentClassConstants.GET_LECTURER_STUDENT_CLASS,
        payload : {
            params
        }
    };
};
export const  actionGetLecturerStudentClassSuccess = (data) => {
    return{
        type : lecturerStudentClassConstants.GET_LECTURER_STUDENT_CLASS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetLecturerStudentClassFail = (error) => {
    return{
        type : lecturerStudentClassConstants.GET_LECTURER_STUDENT_CLASS_FAIL,
        payload : {
            error
        }
    };
}


