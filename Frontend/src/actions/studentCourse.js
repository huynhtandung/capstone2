import * as studentCourseConstants from './../constants/studentCourse';

export const  actionGetStudentCourse = (params = {}) => {
    return{
        type : studentCourseConstants.GET_STUDENT_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetStudentCourseSuccess = (data) => {
    return{
        type : studentCourseConstants.GET_STUDENT_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetStudentCourseFail = (error) => {
    return{
        type : studentCourseConstants.GET_STUDENT_COURSE_FAIL,
        payload : {
            error
        }
    };
}


