import * as loading from '../constants/loading';


const initialState = false;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case loading.SHOW_LOADING:{   
            state = true;
            return state;
        }
        case loading.HIDE_LOADING:{
            state = false;
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
