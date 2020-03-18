import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionGetPDTStudentClass = (params = {}) => {
    return{
        type : pdtInputGrade.PDT_STUDENT_CLASS,
        payload : {
            params
        }
    };
};
export const  actionGetPDTStudentClassSuccess = (data) => {
    return{
        type : pdtInputGrade.PDT_STUDENT_CLASS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTStudentClassFail = (error) => {
    return{
        type : pdtInputGrade.PDT_STUDENT_CLASS_FAIL,
        payload : {
            error
        }
    };
}


