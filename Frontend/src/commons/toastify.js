import {toast} from 'react-toastify';

export const toastifyError = error => {
    toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
    })
};

export const toastifySuceess = message =>{
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    })
}