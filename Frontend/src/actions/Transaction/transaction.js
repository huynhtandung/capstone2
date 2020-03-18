import * as transactionConstants from '../../constants/Transaction/transaction';

export const  actionGetTransaction = (params = {}) => {
    return{
        type : transactionConstants.GET_TRANSACTION,
        payload : {
            params
        }
    };
};
export const  actionGetTransactionSuccess = (data) => {
    return{
        type : transactionConstants.GET_TRANSACTION_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetTransactionFail = (error) => {
    return{
        type : transactionConstants.GET_TRANSACTION_FAIL,
        payload : {
            error
        }
    };
}


