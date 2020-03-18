import { take, call, put} from 'redux-saga/effects';
import * as announce from '../../constants/EditGrade/announce';
import {getAnnounceForLecturer} from '../../apis/editGrade/editGrade'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetAnnounceSuccess, actionGetAnnounceFail} from '../../actions/EditGrade/announce';

import {STATUS_CODE} from '../../constants/index';
import {numberRequestForLecturer} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'

 export default function * watchGetAnnounceForLecturer(){
    while(true){
        const action = yield take(announce.GET_ANNOUNCE_FOR_LECTURER);
        const {params} = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForLecturer, params)
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(getAnnounceForLecturer, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetAnnounceSuccess(data));
            }
        }catch(err){
            yield put(actionGetAnnounceFail(err.message));
        } 
    }
}