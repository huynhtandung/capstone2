import * as announce from '../../constants/EditGrade/announce'
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case announce.GET_ANNOUNCE:{   
            return state;
        }
        case announce.GET_ANNOUNCE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case announce.GET_ANNOUNCE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
