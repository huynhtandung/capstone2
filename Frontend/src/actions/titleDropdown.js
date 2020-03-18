import * as titleDropdownConstants from '../constants/titleDropdown';

export const  actionNotChooseDropdown = () => {
    return{
        type : titleDropdownConstants.NOT_CHOOSE_DROPDOWN,
    };
};
export const  actionHadChoosenDropdown = (data) => {
    //console.log(data);
    return{
        type : titleDropdownConstants.HAD_CHOOSEN_DROPDOWN,
        payload : {
            data
        }
    };
};


