import * as consts from '../../constants/Admin/walletAddress';


const initialState = {
    address : [],
    balance : [],
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case consts.GET_WALLET_ADDRESS:{   
            return state;
        }
        case consts.GET_WALLET_ADDRESS_SUCCESS:{
            const {data} = action.payload;
            state.address = data.address;
            state.balance = data.balance
            return state;
        }
        case consts.GET_WALLET_ADDRESS_FAIL:{
            //const {error} = action.payload;
            return state;
        }
        case consts.UPDATE_BALANCE:{
            const {number, position} = action.payload;
            console.log("User: ",state.balance[position].realBalance)
            state.balance[position].realBalance = state.balance[position].realBalance + number;
            return state;
        }
        case consts.SYNCHRONIZE_BALANCE:{
            const {index, balance} = action.payload
            console.log(state.balance, state.balance[index])
            state.balance = [state.balance[index].dbBalance = state.balance[index].realBalance, ...state.balance]
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
