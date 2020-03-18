import { take, call, put} from 'redux-saga/effects';
import * as ct from '../../constants/Feedback/index';
import {createFeedback} from '../../apis/editGrade/editGrade'
import {STATUS_CODE} from '../../constants/index';
import * as toasty from '../../commons/toastify'
import {showLoading, hideLoading} from '../../actions/loading'

 export default function * createFeedbackSaga(){
    while(true){
        const action = yield take(ct.CREATE_FEED_BACK);
        yield put(showLoading())
        const {params} = action.payload;
        try{
            const res = yield call(createFeedback, params);
            const {status} = res;
            if(status === STATUS_CODE.SUCCESS){
                toasty.toastifySuceess('Send feedback success')
            }else{
                toasty.toastifyError('Send feedback fail')
            }
        }catch(err){
            toasty.toastifyError('Fail')
        } 
        yield put(hideLoading())
    }
}