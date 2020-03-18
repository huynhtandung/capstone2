import * as pdtTranscriptConst from '../../constants/PDTTranscript/pdtTranscript';

export const  actionGetPDTAllDepartment = () => {
    return{
        type : pdtTranscriptConst.PDT_ALL_DEPARTMENT,
    };
};
export const  actionGetPDTAllDepartmentSuccess = (data) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_DEPARTMENT_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTAllDepartmentFail = (error) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_DEPARTMENT_FAIL,
        payload : {
            error
        }
    };
}


