import * as studentGetAllGrade from '../constants/studentGetAllGrade';
import * as toastify from '../commons/toastify';


const initialState = []

const reducer = (state = initialState, action) => {
    switch(action.type){
        case studentGetAllGrade.STUDENT_GET_ALL_GRADE:{   
            return state;
        }
        case studentGetAllGrade.STUDENT_GET_ALL_GRADE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case studentGetAllGrade.STUDENT_GET_ALL_GRADE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
