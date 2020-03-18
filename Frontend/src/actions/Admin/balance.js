import * as constant from '../../constants/Admin/balance';

export const  actionGetBalance = (params = {}) => {
    return{
        type : constant.GET_BALANCE,
        payload : {
            params
        }
    };
};
export const  actionGetBalanceSuccess = (data) => {
    return{
        type : constant.GET_BALANCE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetBalanceFail = (error) => {
    return{
        type : constant.GET_BALANCE_FAIL,
        payload : {
            error
        }
    };
}
export const  actionUpdateBalanceForAdmin = (number) => {
    return{
        type : constant.UPDATE_BALANCE_FOR_ADMIN,
        payload : {
            number
        }
    };
}


