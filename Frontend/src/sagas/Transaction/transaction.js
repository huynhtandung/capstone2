import { take, call, put} from 'redux-saga/effects';
import * as transaction from '../../constants/Transaction/transaction'
import {getTransactionHash, getTransactionData} from '../../apis/Transaction/transaction'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetTransactionSuccess, actionGetTransactionFail} from '../../actions/Transaction/transaction';
import { showLoading, hideLoading } from '../../actions/loading';
import {STATUS_CODE} from '../../constants/index';
import {actionLecturerShow} from '../../actions/lecturerHandleShow'


 export default function * watchGetTransaction(){
    while(true){
        const action = yield take(transaction.GET_TRANSACTION);
        const {params} = action.payload;
      
        yield put(showLoading())
        const res = yield call(getTransactionHash, params)
        const {status, data} = res;
        if(status === STATUS_CODE.SUCCESS){
            //console.log(data)
            let hash = [];
            const hashDateTime = data;
            for(let i = 0; i < data.length ; i++)
                hash.push(data[i].TrHash)
            try{
                const params = {
                    ListTransactionHash : hash
                }
                //console.log(params)
                const res = yield call(getTransactionData, params)
                const {status, data} = res;
                if(status === STATUS_CODE.SUCCESS){
                    let result = [];
                    for(let i = 0; i < hash.length ; i++){
                        //console.log(hash[i])
                        let record = {
                            Grade : data[i],
                            DateTime : hashDateTime[i].DateTime
                        }
                        result.push(record)
                    }
                    //console.log(result)
                    yield put(actionLecturerShow({
                        ViewHistoryGrade : true
                    }))
                    yield put(actionGetTransactionSuccess(result))
                }
            }catch(err){
                yield put(actionGetTransactionFail(err))
            }
        }
        yield put(hideLoading())
    }
}