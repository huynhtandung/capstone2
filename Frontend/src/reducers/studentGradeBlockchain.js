import * as studentGetGradeBlockchain from '../constants/studentGetGradeBlockchain';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        /*case studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN:{  
            state = {};    
            return state;
        }*/
        case studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            state = [];
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
