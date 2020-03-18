import * as lecturerUploadOutLine from '../constants/lecturerUploadOutline';

export const  actionUploadOutLine = (params = {}) => {
    return{
        type : lecturerUploadOutLine.UPLOAD_OUTLINE,
        payload : {
            params
        }
    };
};
export const  actionUploadOutLineSuccess = (data) => {
    return{
        type : lecturerUploadOutLine.UPLOAD_OUTLINE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionUploadOutLineFail = (error) => {
    return{
        type : lecturerUploadOutLine.UPLOAD_OUTLINE_FAIL,
        payload : {
            error
        }
    };
}


