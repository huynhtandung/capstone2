import * as studentGetAllGrade from '../constants/studentGetAllGrade';

export const  actionStudentGetAllGrade = (params = {}) => {
    return{
        type : studentGetAllGrade.STUDENT_GET_ALL_GRADE,
        payload : {
            params
        }
    };
};
export const  actionStudentGetAllGradeSuccess = (data) => {
    return{
        type : studentGetAllGrade.STUDENT_GET_ALL_GRADE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionStudentGetAllGradeFail = (error) => {
    return{
        type : studentGetAllGrade.STUDENT_GET_ALL_GRADE_FAIL,
        payload : {
            error
        }
    };
}


