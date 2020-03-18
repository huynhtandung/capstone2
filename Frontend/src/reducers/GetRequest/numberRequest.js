import * as numberRequest from '../../constants/GetRequest/numberRequest'
//import * as toastify from '../../commons/toastify';


const initialState = '';

const reducer = (state = initialState, action) => {
    switch(action.type){
        case numberRequest.NUMBER_REQUEST:{   
            const {data} = action.payload;
            state = data;
            return state;
        }
        case numberRequest.UPDATE_NUMBER_REQUEST:{
            state = state - 1
            return state;
        }
        default :
            return state;
    }
};

export default reducer;
