import * as lecturerClassGradeConstants from '../constants/lecturerClassGrade';

export const  actionGetLecturerClassGrade = (params = {}) => {
    return{
        type : lecturerClassGradeConstants.GET_LECTURER_CLASS_GRADE,
        payload : {
            params
        }
    };
};
export const  actionGetLecturerClassGradeSuccess = (data) => {
    return{
        type : lecturerClassGradeConstants.GET_LECTURER_CLASS_GRADE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetLecturerClassGradeFail = (error) => {
    return{
        type : lecturerClassGradeConstants.GET_LECTURER_CLASS_GRADE_FAIL,
        payload : {
            error
        }
    };
}


