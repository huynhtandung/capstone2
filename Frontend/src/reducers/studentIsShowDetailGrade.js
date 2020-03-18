import * as studentIsShowDetailGrade from '../constants/studentIsShowDetailGrade';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case studentIsShowDetailGrade.SHOW_DETAIL_GRADE:{  
           state = true;
           return state;
        }
        case studentIsShowDetailGrade.NOT_SHOW_DETAIL_GRADE:{
            state = false;
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
