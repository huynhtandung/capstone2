import * as studentDetailGrade from '../constants/studentDetailGrade';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case studentDetailGrade.GET_STUDENT_DETAIL_GRADE:{      
            return state;
        }
        case studentDetailGrade.GET_STUDENT_DETAIL_GRADE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case studentDetailGrade.GET_STUDENT_DETAIL_GRADE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
