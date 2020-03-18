import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionDeanHandleShow = (data = {}) => {
    return{
        type : pdtConstants.PDT_HANDLE_SHOW,
        payload : {
            data
        }
    };
};



