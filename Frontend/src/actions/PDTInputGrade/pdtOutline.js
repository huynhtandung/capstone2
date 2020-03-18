import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionGetPDTOutline = (params = {}) => {
    return{
        type : pdtInputGrade.PDT_OUTLINE,
        payload :{
            params
        }
    };
};
export const  actionGetPDTOutlineSuccess = (data) => {
    return{
        type : pdtInputGrade.PDT_OUTLINE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTOutlineFail = (error) => {
    return{
        type : pdtInputGrade.PDT_OUTLINE_FAIL,
        payload : {
            error
        }
    };
}


