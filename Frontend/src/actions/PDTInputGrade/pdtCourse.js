import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionGetPDTCourse = (params = {}) => {
    return{
        type : pdtInputGrade.PDT_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetPDTCourseSuccess = (data) => {
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


