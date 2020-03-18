import * as transaction from '../../constants/Transaction/transaction';
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case transaction.GET_TRANSACTION:{   
            return state;
        }
        case transaction.GET_TRANSACTION_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case transaction.GET_TRANSACTION_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
