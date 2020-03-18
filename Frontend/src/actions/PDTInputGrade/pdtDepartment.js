import * as pdtInputGrade from '../../constants/PDTInputGrade/pdtInputGrade';

export const  actionGetPDTDepartment = () => {
    return{
        type : pdtInputGrade.PDT_DEPARTMENT,
    };
};
export const  actionGetPDTDepartmentSuccess = (data) => {
    return{
        type : pdtInputGrade.PDT_DEPARTMENT_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetPDTDepartmentFail = (error) => {
    return{
        type : pdtInputGrade.PDT_DEPARTMENT_FAIL,
        payload : {
            error
        }
    };
}


