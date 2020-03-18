import { take, call, put} from 'redux-saga/effects';
import * as announce from '../../constants/EditGrade/announce';
import {getAnnounce} from '../../apis/editGrade/editGrade'
import {studentGetAllClass} from '../../apis/studentGetAllClass'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetAnnounceSuccess, actionGetAnnounceFail} from '../../actions/EditGrade/announce';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchGetAnnounceForStudent(){
    while(true){
        const action = yield take(announce.GET_ANNOUNCE_FOR_STUDENT);
        //console.log("Da chay vo day")
        const {params} = action.payload;
        try{
            const res = yield call(getAnnounce, params);
            const {status, data} = res;
            let announce = data;
            let finalAnnounce = []
            if(status === STATUS_CODE.SUCCESS){
                try{
                    const res = yield call(studentGetAllClass, params);
                    const {status, data} = res;
                    if(status === STATUS_CODE.SUCCESS){
                        for( let i = 0; i < announce.length ; i++){
                            if(check(data, announce[i].Session_ID) === true){
                                finalAnnounce.push(announce[i])
                            }
                        }
                        yield put(actionGetAnnounceSuccess(finalAnnounce));
                    }
                }catch(err){}
                //yield put(actionGetAnnounceSuccess(data));
            }
        }catch(err){
            yield put(actionGetAnnounceFail(err.message));
        } 
    }
}

function check(array, id){
    for( let i = 0; i < array.length ; i++)
        if(array[i].Session_ID === id)
            return true;
    return false;
}