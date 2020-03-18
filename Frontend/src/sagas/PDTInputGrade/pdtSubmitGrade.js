import { take, call, put } from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import { lecturerUploadGrade } from '../../apis/lecturerUploadGrade'
import { showLoading, hideLoading } from '../../actions/loading';
import { makeAnnounceForPDT } from '../../apis/editGrade/editGrade'
import { getStatus } from '../../apis/editGrade/editGrade';

//import * as toasty from '../../commons/toastify'

import { STATUS_CODE } from '../../constants/index';
import { actionDeanHandleShow } from '../../actions/PDTInputGrade/pdtHandleShow'
//import {actionPDTSubmitGradeSuccess} from '../../actions/PDTInputGrade/pdtSubmitGrade'
import { actionUploadGradeSuccess, actionUploadGradeFail } from '../../actions/lecturerUploadGrade';


export default function* watchPDTSubmitGrade() {
    while (true) {
        const action = yield take(pdtConstants.PDT_SUBMIT_GRADE);
        const { params } = action.payload;
        const globalParams = params
        yield put(showLoading())
        const res = yield call(getStatus, params)
        const { status, data } = res;
        if (status === STATUS_CODE.SUCCESS) {
            let hasEnterd = data.status[params.idFinalTest] //kiem tra xem cot do da nhap diem chua
            //console.log(hasEnterd)
            if (hasEnterd === '0' || hasEnterd === undefined) {
                //console.log("Lan dau tien nhap diem thi")
                //console.log("Goi api upload grade: ", params.Class)
                const res = yield call(lecturerUploadGrade, params);
                const { status, data } = res;
                if (status === STATUS_CODE.SUCCESS) {
                    //console.log("Upload grade xong")
                    yield put(actionUploadGradeSuccess(data));
                    yield put(actionDeanHandleShow({
                        showStudentClass: false
                    }))
                    yield put(hideLoading())
                    //toasty.toastifySuceess('Upload successfully')
                }
            } else {
                //console.log("Da nhap diem thi roi va dang sua diem")
                var date = new Date();
                const pr = {
                    Session_ID: params.Session_ID,
                    OutLine_ID: params.outlineID,
                    DateTime: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    Reason : globalParams.Reason
                }
                //tao announce
                try {
                    //console.log("Tao thong bao")
                    const res = yield call(makeAnnounceForPDT, pr)
                    const { status } = res;

                    if (status === STATUS_CODE.SUCCESS) {
                        try {
                            //console.log("Tao xong thong bao")
                            //console.log("Goi api upload grade: ", params.Class)
                            const res = yield call(lecturerUploadGrade, params);
                            const { status, data } = res;
                            if (status === STATUS_CODE.SUCCESS) {
                                //console.log("Upload grade xong")
                                yield put(actionUploadGradeSuccess(data));
                                yield put(actionDeanHandleShow({
                                    showStudentClass: false
                                }))
                                yield put(hideLoading())
                               // toasty.toastifySuceess('Upload successfully')
                            }
                        } catch (err) {
                            yield put(actionUploadGradeFail(err.message));
                        }
                    }
                } catch (err) {
                    yield put(actionUploadGradeFail(err.message));
                }
            }
        }

        //da nhap diem thi ro
    }
}