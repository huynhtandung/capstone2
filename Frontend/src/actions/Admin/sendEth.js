import * as constant from '../../constants/Admin/sendEth';

export const  actionSendEth = (params = {}) => {
    return{
        type : constant.SEND_ETH,
        payload : {
            params
        }
    };
};
export const  actionSendEthSuccess = (data) => {
    return{
        type : constant.SEND_ETH_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionSendEthFail = (error) => {
    return{
        type : constant.SEND_ETH_FAIL,
        payload : {
            error
        }
    };
}


