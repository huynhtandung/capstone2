import * as studentDetailGradeConstants from '../constants/studentDetailGrade';

export const  actionGetStudentDetailGrade = (params = {}) => {
    return{
        type : studentDetailGradeConstants.GET_STUDENT_DETAIL_GRADE,
        payload : {
            params
        }
    };
};
export const  actionGetStudentDetailGradeSuccess = (data) => {
    return{
        type : studentDetailGradeConstants.GET_STUDENT_DETAIL_GRADE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetStudentDetailGradeFail = (error) => {
    return{
        type : studentDetailGradeConstants.GET_STUDENT_DETAIL_GRADE_FAIL,
        payload : {
            error
        }
    };
}


