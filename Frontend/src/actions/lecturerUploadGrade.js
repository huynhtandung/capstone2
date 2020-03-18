import * as lecturerUploadGrade from '../constants/lecturerUploadGrade';

export const  actionUploadGrade = (params = {}) => {
    return{
        type : lecturerUploadGrade.UPLOAD_GRADE,
        payload : {
            params
        }
    };
};
export const  actionUploadGradeSuccess = (data) => {
    return{
        type : lecturerUploadGrade.UPLOAD_GRADE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionUploadGradeFail = (error) => {
    return{
        type : lecturerUploadGrade.UPLOAD_GRADE_FAIL,
        payload : {
            error
        }
    };
}


