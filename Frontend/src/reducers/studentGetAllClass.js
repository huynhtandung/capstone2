import * as studentGetAllClass from '../constants/studentGetAllClass';
import * as toastify from '../commons/toastify';


const initialState = []

const reducer = (state = initialState, action) => {
    switch(action.type){
        case studentGetAllClass.STUDENT_GET_ALL_CLASS_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case studentGetAllClass.STUDENT_GET_ALL_CLASS_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
