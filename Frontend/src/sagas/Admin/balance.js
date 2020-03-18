import { take, call, put} from 'redux-saga/effects';
import * as consts from '../../constants/Admin/balance';
import {getBalance} from '../../apis/Admin';
import {actionGetBalanceSuccess, actionGetBalanceFail} from '../../actions/Admin/balance';
import {STATUS_CODE} from '../../constants/index';
import {getDepartment} from '../../apis/Admin';
import {actionGetDepartmentSuccess, /*actionGetDepartmentFail*/} from '../../actions/Admin/department';

import {/*actionShowLoading, actionHideLoading*/ showLoading, hideLoading} from '../../actions/loading'


 export default function * watchGetBalance(){
    while(true){
        const action = yield take(consts.GET_BALANCE);
        yield put(showLoading())
        const {params} = action.payload;
        try{
            const res = yield call(getBalance, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetBalanceSuccess(data));
                const res = yield call(getDepartment);
                const {status} = res;
                if(status === STATUS_CODE.SUCCESS){
                    yield put(actionGetDepartmentSuccess(res.data))
                }
                else{

                }
            }
        }catch(err){
            yield put(actionGetBalanceFail(err.message));
        } 
        yield put(hideLoading())
    }
}