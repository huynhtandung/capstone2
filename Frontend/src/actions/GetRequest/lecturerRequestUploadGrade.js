import * as announce from '../../constants/GetRequest/lecturerRequestUploadGrade';

export const  actionLecturerRequestUploadGrade = (params = {}) => {
    return{
        type : announce.LECTURER_REQUEST_UPLOAD_GRADE,
        payload : {
            params
        }
    };
};
export const  actionLecturerRequestUploadGradeSuccess = (data) => {
    return{
        type : announce.LECTURER_REQUEST_UPLOAD_GRADE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionLecturerRequestUploadGradeFail = (error) => {
    return{
        type : announce.LECTURER_REQUEST_UPLOAD_GRADE_FAIL,
        payload : {
            error
        }
    };
}


