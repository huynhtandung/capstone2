import { take, call, put} from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/updateRequestDB';
import {updateRequestForPDT} from '../../apis/Request/updateRequest'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionUpdateRequest} from '../../actions/GetRequest/getRequestForPDT';

import {STATUS_CODE} from '../../constants/index';
//import {showLoading, hideLoading } from '../../actions/loading';
//import { getAnnounceForDean } from '../../apis/editGrade/editGrade';


 export default function * watchUpdateRequestDBForPDT(){
    while(true){
        const action = yield take(request.UPDATE_REQUEST_DB_FOR_PDT);
        const {params} = action.payload;
        //console.log("Update request db")
        //yield put(showLoading())
        try{
            const res = yield call(updateRequestForPDT, params);
            const {status} = res;
            if(status === STATUS_CODE.SUCCESS){
                //console.log("Update request xong")
                yield put(actionUpdateRequest(params))
            }else{
            }
        }catch(err){
        } 
        //yield put(hideLoading())
    }
}