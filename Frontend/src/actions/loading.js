import * as loading from '../constants/loading';

export const  showLoading = () => {
    return{
        type : loading.SHOW_LOADING,
    };
};
export const  hideLoading = () => {
    return{
        type : loading.HIDE_LOADING
    };
};



