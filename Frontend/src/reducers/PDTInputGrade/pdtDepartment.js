import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade'
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case pdtConstants.PDT_DEPARTMENT:{   
            return state;
        }
        case pdtConstants.PDT_DEPARTMENT_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case pdtConstants.PDT_DEPARTMENT_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
