import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';


const initialState = {
    titleKhoa : 'Choose Course',
    titleClass : 'Choose Class Name',
    showTranscript : false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case deanViewTranscript.DEAN_HANDLE_SHOW:{
            const {data} = action.payload;
            if(data.titleKhoa)
                state.titleKhoa = "Course " + data.titleKhoa
            
            if(data.titleClass)
                state.titleClass =  data.titleClass
                
            state.showTranscript =  data.showTranscript
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
