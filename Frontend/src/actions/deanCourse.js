import * as deanCourseConstants from '../constants/deanCourse';

export const  actionGetDeanCourse = (params = {}) => {
    return{
        type : deanCourseConstants.GET_DEAN_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetDeanCourseSuccess = (data) => {
    return{
        type : deanCourseConstants.GET_DEAN_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanCourseFail = (error) => {
    return{
        type : deanCourseConstants.GET_DEAN_COURSE_FAIL,
        payload : {
            error
        }
    };
}


