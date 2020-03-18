import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionGetPDTSchoolYear = () => {
    return{
        type : pdtInputGrade.PDT_SCHOOL_YEAR,
    };
};
export const  actionGetPDTSchoolYearSuccess = (data) => {
    return{
        type : pdtInputGrade.PDT_SCHOOL_YEAR_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTSchoolYearFail = (error) => {
    return{
        type : pdtInputGrade.PDT_SCHOOL_YEAR_FAIL,
        payload : {
            error
        }
    };
}


