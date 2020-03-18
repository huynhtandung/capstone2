import * as constant from '../../constants/Admin/department';

export const  actionGetDepartment = () => {
    return{
        type : constant.GET_DEPARTMENT_FOR_ADMIN,
    };
};
export const  actionGetDepartmentSuccess = (data) => {
    //console.log("Action", data)
    return{
        type : constant.GET_DEPARTMENT_FOR_ADMIN_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetDepartmentFail = (error) => {
    return{
        type : constant.GET_DEPARTMENT_FOR_ADMIN_FAIL,
        payload : {
            error
        }
    };
}


