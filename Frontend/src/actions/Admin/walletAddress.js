import * as constant from '../../constants/Admin/walletAddress';

export const  actionGetWalletAddress = (params = {}) => {
    return{
        type : constant.GET_WALLET_ADDRESS,
        payload : {
            params
        }
    };
};
export const  actionGetWalletAddressSuccess = (data) => {
    return{
        type : constant.GET_WALLET_ADDRESS_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetWalletAddressFail = (error) => {
    return{
        type : constant.GET_WALLET_ADDRESS_FAIL,
        payload : {
            error
        }
    };
}
export const  actionUpdateBalance = (number, position) => {
    return{
        type : constant.UPDATE_BALANCE,
        payload : {
            number,
            position
        }
    };
}


