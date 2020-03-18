import { take, call, put } from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/lecturerRequestUploadGrade';
import { lecturerUploadGrade } from '../../apis/lecturerUploadGrade'
//import {lecturerGetClassGrade} from '../../apis/lecturerGetClassGrade'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import { getStatus } from '../../apis/editGrade/editGrade'


import { STATUS_CODE } from '../../constants/index';
import { showLoading, hideLoading } from '../../actions/loading';
//import { getAnnounceForDean } from '../../apis/editGrade/editGrade';
import * as toastify from '../../commons/toastify'


export default function* watchLecturerRequestUploadGrade() {
    while (true) {
        const action = yield take(request.LECTURER_REQUEST_UPLOAD_GRADE);
        const { params } = action.payload;
        yield put(showLoading())
        const res = yield call(getStatus, params)
        const { status, data } = res;
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data, params.id)
            if (data.status[params.id] === "4") {
                
                try {
                    const res = yield call(lecturerUploadGrade, params);
                    const { status } = res;
                    if (status === STATUS_CODE.SUCCESS) {
                        toastify.toastifySuceess('Success')
                    } else {
                    }
                } catch (err) {
                }
               
            }
        } else {
            toastify.toastifySuceess('Fail')
        }
        yield put(hideLoading())
    }
}

