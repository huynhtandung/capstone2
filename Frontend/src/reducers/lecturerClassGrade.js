import * as lecturerClassGrade from '../constants/lecturerClassGrade';
import * as toastify from '../commons/toastify';


const initialState = '';

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerClassGrade.GET_LECTURER_CLASS_GRADE:{   
            return state;
        }
        case lecturerClassGrade.GET_LECTURER_CLASS_GRADE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case lecturerClassGrade.GET_LECTURER_CLASS_GRADE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
