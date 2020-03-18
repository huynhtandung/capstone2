import * as consts from '../../constants/Admin/department';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case consts.GET_DEPARTMENT_FOR_ADMIN:{   
            return state;
        }
        case consts.GET_DEPARTMENT_FOR_ADMIN_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case consts.GET_DEPARTMENT_FOR_ADMIN_FAIL:{
            //const {error} = action.payload;
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
