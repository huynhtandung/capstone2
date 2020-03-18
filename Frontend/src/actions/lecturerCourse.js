import * as lecturerCourseConstants from '../constants/lecturerCourse';

export const  actionGetLecturerCourse = (params = {}) => {
    return{
        type : lecturerCourseConstants.GET_LECTURER_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetLecturerCourseSuccess = (data) => {
    return{
        type : lecturerCourseConstants.GET_LECTURER_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetLecturerCourseFail = (error) => {
    return{
        type : lecturerCourseConstants.GET_LECTURER_COURSE_FAIL,
        payload : {
            error
        }
    };
}


