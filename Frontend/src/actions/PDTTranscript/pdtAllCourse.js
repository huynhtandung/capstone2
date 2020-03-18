import * as pdtTranscriptConst from '../../constants/PDTTranscript/pdtTranscript';

export const  actionGetPDTAllCourse = () => {
    return{
        type : pdtTranscriptConst.PDT_ALL_COURSE,
    };
};
export const  actionGetPDTAllCourseSuccess = (data) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_COURSE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTAllCourseFail = (error) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_COURSE_FAIL,
        payload : {
            error
        }
    };
}


