import * as lecturerHandleShow from '../constants/lecturerHandleShow';

export const  actionLecturerShow = (data) => {
    return{
        type : lecturerHandleShow.LECTURER_SHOW,
        payload : {
            data
        }
    };
};
export const  actionLecturerNotShow = () => {
    return{
        type : lecturerHandleShow.LECTURER_NOT_SHOW,
    };
};


