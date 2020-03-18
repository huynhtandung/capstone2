import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionPDTSubmitGrade = (params = {}) => {
    return{
        type : pdtInputGrade.PDT_SUBMIT_GRADE,
        payload : {
            params
        }
    };
};
export const  actionPDTSubmitGradeSuccess = (data) => {
    return{
        type : pdtInputGrade.PDT_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTCourseFail = (error) => {
    return{
        type : pdtInputGrade.PDT_COURSE_FAIL,
        payload : {
            error
        }
    };
}


