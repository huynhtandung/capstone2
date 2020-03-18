import * as request from '../../constants/GetRequest/acceptRequest'
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case request.ACCEPT_REQUEST:{   
            return state;
        }
        case request.ACCEPT_REQUEST_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case request.ACCEPT_REQUEST_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
