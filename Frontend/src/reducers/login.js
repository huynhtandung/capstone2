import * as loginC from './../constants/login';


const initialState = {
    isLogin : "",
    user : "",
    id: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case loginC.LOGIN:{
            const {params} = action.payload;
            state.isLogin = true;
            state.user = params.user;
            state.id = params.id;
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
