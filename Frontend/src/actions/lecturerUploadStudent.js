import * as lecturerUploadStudent from '../constants/lecturerUploadStudent';

export const  actionUploadStudent = (params = {}) => {
    return{
        type : lecturerUploadStudent.UPLOAD_STUDENT,
        payload : {
            params
        }
    };
};
export const  actionUploadStudentSuccess = (data) => {
    return{
        type : lecturerUploadStudent.UPLOAD_STUDENT_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionUploadStudentFail = (error) => {
    return{
        type : lecturerUploadStudent.UPLOAD_STUDENT_FAIL,
        payload : {
            error
        }
    };
}


