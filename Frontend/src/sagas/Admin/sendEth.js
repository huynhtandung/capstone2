import { take, call, put} from 'redux-saga/effects';
import * as consts from '../../constants/Admin/sendEth';
import {sendEth} from '../../apis/Admin';
import {STATUS_CODE} from '../../constants/index';

import {/*actionShowLoading, actionHideLoading*/ showLoading, hideLoading} from '../../actions/loading'
import * as toasty from '../../commons/toastify'




 export default function * watchSendEth(){
    while(true){
        const action = yield take(consts.SEND_ETH);
        yield put(showLoading())
        const {params} = action.payload;
        try{
            const res = yield call(sendEth, params);
            const {status} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(hideLoading())
                toasty.toastifySuceess("Success")
            }
        }catch(err){
        } 
    }
}