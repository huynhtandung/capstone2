import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';

export const  actionDeanHandleShow = (data = {}) => {
    return{
        type : deanViewTranscript.DEAN_HANDLE_SHOW,
        payload : {
            data
        }
    };
};



