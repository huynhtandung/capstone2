import * as deanSchoolYearConstants from '../constants/deanSchoolYear';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR:{   
            state = []
            return state;
        }
        case deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR_SUCCESS:{
           
            const {data} = action.payload;
            data.map((record, index)=>{
                return state.push(record.Session_Year)
            })
            return state;
        }
        case deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR_FAIL:{
          
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
