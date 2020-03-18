import * as titleDropdownConstants from './../constants/titleDropdown';


const initialState = {
    Year : "",
    Session : "",
    titleDropdown : "-- Select school year and semester --"
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case titleDropdownConstants.HAD_CHOOSEN_DROPDOWN:{
            const {data} = action.payload;
            if(data.Year !== null)
                state.Year = data.Year;
            if(data.Session !== null)
                state.Session = data.Session;
            state = data;
            state.titleDropdown = "School year " + state.Year + " Session " + state.Session;
            return state;
        }
        case titleDropdownConstants.NOT_CHOOSE_DROPDOWN:{
            state.titleDropdown = "-- Select school year and semester --";
            state.Year = "";
            state.Session = "";
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
