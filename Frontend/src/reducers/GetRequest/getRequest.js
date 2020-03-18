import * as request from '../../constants/GetRequest/index'
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case request.GET_REQUEST_FOR_PDT:{   
            return state;
        }
        case request.GET_REQUEST_FOR_PDT_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case request.UPDATE_REQUEST:{
            const {data} = action.payload;
            console.log("Update: ", data)
            //data chua ID cua request và Decision
            //tim index cua phan request can update
            let indexRequestEdit = -1;
            state.forEach((item, index)=>{
                if(item.ID === data.ID){
                    indexRequestEdit = index;
                }
            });
            if(data.Type === 'PDT'){
                state[indexRequestEdit] = {
                    ...state[indexRequestEdit],
                    AcceptByPDT : data.Decision
                }
            }else if(data.Type === 'Dean'){
                state[indexRequestEdit] = {
                    ...state[indexRequestEdit],
                    AcceptByDean : data.Decision
                }
            }else{
                state[indexRequestEdit] = {
                    ...state[indexRequestEdit],
                    HasUpload : data.Value
                }
            }
            return [...state];
        }
        case request.GET_REQUEST_FOR_PDT_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
