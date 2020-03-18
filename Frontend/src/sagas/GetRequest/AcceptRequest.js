import { take, call, put} from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/acceptRequest';
import {acceptReq} from '../../apis/editGrade/editGrade'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionAcceptRequestSuccess, actionAcceptRequestFail} from '../../actions/GetRequest/acceptRequest';

import {STATUS_CODE} from '../../constants/index';
import {showLoading, hideLoading } from '../../actions/loading';
//import { getAnnounceForDean } from '../../apis/editGrade/editGrade';
import * as toastify from '../../commons/toastify'


 export default function * watchAcceptRequest(){
    while(true){
        const action = yield take(request.ACCEPT_REQUEST);
        const {params} = action.payload;
        yield put(showLoading())
        //console.log("Accept request blockchain")
        try{
            const res = yield call(acceptReq, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionAcceptRequestSuccess(data))
                //console.log("Accept thanh cong")
                yield put(hideLoading())
            
                toastify.toastifySuceess('Success')
            }else{
                toastify.toastifyError('Fail')
            }
        }catch(err){
            yield put(actionAcceptRequestFail(err.message));
        } 
    }
}