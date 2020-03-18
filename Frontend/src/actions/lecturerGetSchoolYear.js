import * as lecturerSchoolYearConstants from '../constants/lecturerSchoolYear';

export const  actionGetLecturerSchoolYear = (params = {}) => {
    return{
        type : lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR,
        payload : {
            params
        }
    };
};
export const  actionGetLecturerSchoolYearSuccess = (data) => {
    return{
        type : lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetLecturerSchoolYearFail = (error) => {
    return{
        type : lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR_FAIL,
        payload : {
            error
        }
    };
}


