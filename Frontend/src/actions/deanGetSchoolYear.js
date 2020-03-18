import * as deanSchoolYearConstants from '../constants/deanSchoolYear';

export const  actionGetDeanSchoolYear = (params = {}) => {
    return{
        type : deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR,
        payload : {
            params
        }
    };
};
export const  actionGetDeanSchoolYearSuccess = (data) => {
    return{
        type : deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanSchoolYearFail = (error) => {
    return{
        type : deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR_FAIL,
        payload : {
            error
        }
    };
}


