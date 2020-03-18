import { take, call, put } from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/updateRequestDB';
import { updateRequestForLecturer } from '../../apis/Request/updateRequest'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import { actionUpdateRequest } from '../../actions/GetRequest/getRequestForPDT';

import { STATUS_CODE } from '../../constants/index';
//import {showLoading, hideLoading } from '../../actions/loading';
//import { getAnnounceForDean } from '../../apis/editGrade/editGrade';
import { makeAnnounce } from '../../apis/editGrade/editGrade';


export default function* watchUpdateRequestDBForLecturer() {
    while (true) {
        const action = yield take(request.UPDATE_REQUEST_DB_FOR_LECTURER);
        const { params } = action.payload;
        //console.log("Update request db")
        //yield put(showLoading())
        try {
            const res = yield call(updateRequestForLecturer, params);
            const { status } = res;
            if (status === STATUS_CODE.SUCCESS) {
                //console.log("Update request xong")
                yield put(actionUpdateRequest(params))
                //tao annoucement thong bao cho student and dean, pdt
                if (params.Value === 1 || params.Value === "1") {
                    var date = new Date();
                    const pr = {
                        Session_ID: params.Session_ID,
                        OutLine_ID: params.OutLine_ID,
                        DateTime: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        Reason: "Approved by academic affairs department and Dean"
                    }
                    try {
                        //console.log("Tao thong bao")
                        yield call(makeAnnounce, pr)

                    } catch (err) { }
                }
            } else {
            }
        } catch (err) {
        }
        //yield put(hideLoading())
    }
}