import * as studentSchoolYearConstants from '../constants/studentSchoolYear';

export const  actionGetStudentSchoolYear = (params = {}) => {
    return{
        type : studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR,
        payload : {
            params
        }
    };
};
export const  actionGetStudentSchoolYearSuccess = (data) => {
    return{
        type : studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetStudentSchoolYearFail = (error) => {
    return{
        type : studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR_FAIL,
        payload : {
            error
        }
    };
}


