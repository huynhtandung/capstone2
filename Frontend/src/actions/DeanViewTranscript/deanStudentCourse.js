import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';

export const  actionGetStudentDeanCourse = (params = {}) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetDeanStudentCourseSuccess = (data) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDeanStudentCourseFail = (error) => {
    return{
        type : deanViewTranscript.GET_DEAN_STUDENT_COURSE_FAIL,
        payload : {
            error
        }
    };
}


