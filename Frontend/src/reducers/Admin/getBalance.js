import * as consts from '../../constants/Admin/balance';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case consts.GET_BALANCE:{   
            return state;
        }
        case consts.GET_BALANCE_SUCCESS:{
            const {data} = action.payload;
            //console.log('REducer', data)
            state = data;
            return state;
        }
        case consts.GET_BALANCE_FAIL:{
            //const {error} = action.payload;
            return state;
        }
        case consts.UPDATE_BALANCE_FOR_ADMIN:{
            const {number} = action.payload;
            state = state - number;
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
