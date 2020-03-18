import * as lecturerDetailCourseConstants from '../constants/lecturerDetailCourse';

export const  actionGetLecturerDetailCourse = (params = {}) => {
    return{
        type : lecturerDetailCourseConstants.GET_LECTURE_DETAIL_COURSE,
        payload : {
            params
        }
    };
};
export const  actionGetLecturerDetailCourseSuccess = (data) => {
    return{
        type : lecturerDetailCourseConstants.GET_LECTURE_DETAIL_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetLecturerDetailCourseFail = (error) => {
    return{
        type : lecturerDetailCourseConstants.GET_LECTURE_DETAIL_COURSE_FAIL,
        payload : {
            error
        }
    };
}


