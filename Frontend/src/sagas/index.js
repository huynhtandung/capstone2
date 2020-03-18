
//const taskEditing = yield select(state => state.task.taskEditing);
import { fork, take, call, put } from 'redux-saga/effects';
//import * as toasty from '../commons/toastify'

import * as studentCourseConstants from './../constants/studentCourse';
import * as detailGradeConstants from './../constants/studentDetailGrade';
import * as studentSchoolYearConstants from './../constants/studentSchoolYear';
//import * as gradeBlockchain from './../constants/studentGetGradeBlockchain';
import * as studentGetAllGradeConstants from '../constants/studentGetAllGrade';

import * as lecturerSchoolYearConstants from '../constants/lecturerSchoolYear';
import * as lecturerDetailCourseConstants from '../constants/lecturerDetailCourse';
import * as lecturerCourseConstants from '../constants/lecturerCourse';
import * as lecturerStudentClassConstants from '../constants/lecturerStudentClass';
import * as lecturerClassGrade from '../constants/lecturerClassGrade';
import * as lecturerUploadStudentConstants from '../constants/lecturerUploadStudent';
import * as watchLecturerUploadOutLineConstants from '../constants/lecturerUploadOutline';
import * as watchLecturerUploadGradeConstants from '../constants/lecturerUploadGrade';
//import * as actionLecturerHandleShow from '../constants/lecturerHandleShow';

import * as deanSchoolYearConstants from '../constants/deanSchoolYear';
import * as deanCourseConstants from '../constants/deanCourse';


import { studentCourse } from '../apis/studentCourse';
import { studentDetailGrade } from '../apis/studentDetailGrade';
import { studentSchoolYear } from '../apis/studentSchoolYear';
import { studentGradeBlockchain } from '../apis/studentGetGradeBlockchain';
import { studentGetAllClass } from '../apis/studentGetAllClass';
import { studentGetAllGrade } from '../apis/studentGetAllGrade';

import { lecturerSchoolYear } from '../apis/lecturerSchoolYear';
import { lecturerDetailCourse } from '../apis/lecturerDetailCourse';
import { lecturerCourse } from '../apis/lecturerCourse';
import { lecturerStudentClass } from '../apis/lecturerStudentClass';
import { checkPhienRequest } from '../apis/GetPrivateKey/getPrivatekey'

import { lecturerUploadStudent } from '../apis/lecturerUploadStudent';
import { lecturerUploadOutLine } from '../apis/lecturerUploadOutLine';
import { lecturerUploadGrade } from '../apis/lecturerUploadGrade';

import { getStatus } from '../apis/editGrade/editGrade'
import { /*acceptReq*/ } from '../apis/editGrade/editGrade'
import { makeAnnounce } from '../apis/editGrade/editGrade'
import { makeRequest } from '../apis/Request/makeRequest'
import { sendRequest } from '../apis/Request/sendRequest'

import { lecturerGetClassGrade } from '../apis/lecturerGetClassGrade';

import { deanSchoolYear } from '../apis/deanSchoolYear';
import { deanCourse } from '../apis/deanCourse';

import { isUpload } from '../apis/isUpload';
import { getIsUpload } from '../apis/getIsUpload';

import { numberRequestForDean } from '../apis/Request/getNumberRequest'
import { actionNumberRequest } from '../actions/GetRequest/numberRequest'
import { numberRequestForLecturer } from '../apis/Request/getNumberRequest'




import { STATUS_CODE } from '../constants';

import { actionGetStudentCourseSuccess, actionGetStudentCourseFail } from '../actions/studentCourse';
import { actionGetStudentDetailGradeSuccess, actionGetStudentDetailGradeFail } from '../actions/studentDetailGrade';
import { actionStudentGetGradeBlockchainSuccess, actionStudentGetGradeBlockchainFail } from '../actions/studentGetGradeBlockchain';
import { actionGetStudentSchoolYearSuccess, actionGetStudentSchoolYearFail } from '../actions/studentGetSchoolYear';

import { actionGetLecturerSchoolYearSuccess, actionGetLecturerSchoolYearFail } from '../actions/lecturerGetSchoolYear';
import { actionGetLecturerDetailCourseSuccess, actionGetLecturerDetailCourseFail } from '../actions/lecturerGetDetailCourse';
import { actionGetLecturerCourseSuccess, actionGetLecturerCourseFail } from '../actions/lecturerCourse';
import { actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail } from '../actions/lecturerGetStudentClass';
import { actionGetLecturerClassGradeFail } from '../actions/lecturerClassGrade';

import { actionUploadStudentSuccess, actionUploadStudentFail } from '../actions/lecturerUploadStudent';
import { actionUploadOutLineSuccess, actionUploadOutLineFail } from '../actions/lecturerUploadOutline';
import { actionUploadGradeSuccess, actionUploadGradeFail } from '../actions/lecturerUploadGrade';
import { actionLecturerShow } from '../actions/lecturerHandleShow';
import { actionGetLecturerClassGradeSuccess } from '../actions/lecturerClassGrade';
import { showLoading, hideLoading } from '../actions/loading';
import { actionStudentGetAllGradeSuccess, actionStudentGetAllGradeFail } from '../actions/studentGetAllGrade';
import { actionStudentGetAllClassSuccess, /*actionStudentGetAllClassFail*/ } from '../actions/studentGetAllClass';

import { actionGetDeanSchoolYearSuccess, actionGetDeanSchoolYearFail } from '../actions/deanGetSchoolYear';
import { actionGetDeanCourseSuccess, actionGetDeanCourseFail } from '../actions/deanCourse';



import watchDeanKhoa from './DeanViewTranscript/DeanKhoa';
import watchDeanClass from './DeanViewTranscript/DeanClass';
import watchDeanStudentClass from './DeanViewTranscript/DeanStudentClass';
import watchDeanStudentCourse from './DeanViewTranscript/DeanStudentCourse';

import watchPDTSchoolYear from './PDTInputGrade/PDTSchoolYear';
import watchPDTDepartment from './PDTInputGrade/PDTDepartment';
import watchPDTStudentClass from './PDTInputGrade/PDTStudentClass';
//import watchPDTOutline from './PDTInputGrade/PDTOutline';
import watchPDTCourse from './PDTInputGrade/pdtCourse'
import watchPDTSubmitGrade from './PDTInputGrade/pdtSubmitGrade'

import watchPDTAllCourse from './PDTTranscript/pdtAllCourse'
import watchPDTAllDepartment from './PDTTranscript/pdtAllDepartment'
import watchPDTAllClass from './PDTTranscript/pdtAllClass'
import watchPDTAllStudentClass from './PDTTranscript/pdtAllStudentClass'

import watchGetAnnounce from './EditGrade/announce'
import watchGetAnnounceForDean from './EditGrade/announceForDean'
import watchGetAnnounceForStudent from './EditGrade/announceForStudent'
import watchGetAnnounceForLecturer from './EditGrade/announceForLecturer'

import watchGetRequestForPDT from './GetRequest/GetRequestForPDT'
import watchGetRequestForDean from './GetRequest/GetRequestForDean';
import watchAcceptRequest from './GetRequest/AcceptRequest'
import watchUpdateRequestForPDT from './GetRequest/updateRequestForPDT';
import watchUpdateRequestForDean from './GetRequest/updateRequestForDean';
import watchGetRequestForLecturer from './GetRequest/GetRequestForLecturer'
import watchUpdateRequestForLecturer from './GetRequest/updateRequestForLecturer'
import watchLecturerRequestUploadGrade from './GetRequest/lecturerRequestUploadGrade'

import watchGetTransaction from './Transaction/transaction'
import * as toastify from '../commons/toastify';
//import { yieldExpression } from '@babel/types';


import watchGetDepartmentForAdmin from './Admin/department'
import watchGetBalance from './Admin/balance'
import watchGetGetWalletAddress from './Admin/walletAddress'
import watchSendEth from './Admin/sendEth'

import createFeedback from './Feedback/index'



function* rootSaga() {
    yield fork(watchGetStudentCourse);
    yield fork(watchGetDetailGrade);
    yield fork(watchGetStudentSchoolYear)
    //yield fork(watchGetGradeBlockchain);
    yield fork(watchGetStudentAllGrade)

    yield fork(watchGetLecturerSchoolYear)
    yield fork(watchGetLecturerDetailCourse)
    yield fork(watchGetLecturerCourse);
    yield fork(watchGetLecturerStudentClass);
    yield fork(watchGetLecturerClassGrade);

    yield fork(watchLecturerUploadStudent);
    yield fork(watchLecturerUploadOutLine);
    yield fork(watchLecturerUploadGrade);

    yield fork(watchGetDeanSchoolYear);
    yield fork(watchGetDeanCourse);

    // dean view transcript
    yield fork(watchDeanKhoa);
    yield fork(watchDeanClass);
    yield fork(watchDeanStudentClass);
    yield fork(watchDeanStudentCourse);

    //pdt input grade
    yield fork(watchPDTSchoolYear);
    yield fork(watchPDTDepartment);
    yield fork(watchPDTStudentClass);
    //yield fork(watchPDTOutline);
    yield fork(watchPDTCourse)
    yield fork(watchPDTSubmitGrade);

    //pdt view transcript
    yield fork(watchPDTAllCourse);
    yield fork(watchPDTAllDepartment)
    yield fork(watchPDTAllClass)
    yield fork(watchPDTAllStudentClass)

    yield fork(watchGetAnnounce)
    yield fork(watchGetAnnounceForDean)
    yield fork(watchGetAnnounceForStudent)
    yield fork(watchGetAnnounceForLecturer)

    yield fork(watchGetRequestForPDT)
    yield fork(watchGetRequestForDean)
    yield fork(watchAcceptRequest)
    yield fork(watchUpdateRequestForPDT)
    yield fork(watchUpdateRequestForDean)
    yield fork(watchGetRequestForLecturer)
    yield fork(watchUpdateRequestForLecturer)
    yield fork(watchLecturerRequestUploadGrade)

    yield fork(watchGetTransaction)


    yield fork(watchGetDepartmentForAdmin)
    yield fork(watchGetBalance)
    yield fork(watchGetGetWalletAddress)
    yield fork(watchSendEth)

    yield fork(createFeedback)

};

function* watchGetStudentCourse() {
    while (true) {
        const action = yield take(studentCourseConstants.GET_STUDENT_COURSE);
        const { params } = action.payload;

        try {
            const res = yield call(studentCourse, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetStudentCourseSuccess(data));
            }
        } catch (err) {
            yield put(actionGetStudentCourseFail(err.message));
        }
    }
}
function* watchGetDetailGrade() {
    while (true) {
        const action = yield take(detailGradeConstants.GET_STUDENT_DETAIL_GRADE);
        const { params } = action.payload;
        yield put(showLoading())
        try {
            const res = yield call(studentDetailGrade, params.DetailGrade);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetStudentDetailGradeSuccess(data));
                try {
                    const resp = yield call(studentGradeBlockchain, params.Blockchain);
                    const { status, data } = resp;
                    if (status === STATUS_CODE.SUCCESS) {
                        yield put(actionStudentGetGradeBlockchainSuccess(data));
                    }
                } catch (err) {
                    yield put(actionStudentGetGradeBlockchainFail(err.message))
                }
            }
        } catch (err) {
            yield put(actionGetStudentDetailGradeFail(err.message));
        }
        yield put(hideLoading())
    }
}
function* watchGetStudentSchoolYear() {
    while (true) {
        const action = yield take(studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR);
        const { params } = action.payload;
        try {
            const res = yield call(studentSchoolYear, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetStudentSchoolYearSuccess(data));
            }
        } catch (err) {
            yield put(actionGetStudentSchoolYearFail(err.message));
        }
    }
}
function* watchGetStudentAllGrade() {
    while (true) {
        const action = yield take(studentGetAllGradeConstants.STUDENT_GET_ALL_GRADE);
        const { params } = action.payload;
        yield put(showLoading())
        try {
            const res = yield call(studentSchoolYear, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetStudentSchoolYearSuccess(data));
                try {
                    const res = yield call(studentGetAllClass, params);
                    const { status, data } = res;
                    if (status === STATUS_CODE.SUCCESS) {
                        yield put(actionStudentGetAllClassSuccess(data));
                        let arr = [];
                        data.map((record, index) => {
                            return arr.push(ignoreSpaces(`${record.Session_Year}-${changeLeterSemester(record.Session_Semester)}-${record.Session_ID}-${record.Course_ID}`))
                        })
                        //let a = []
                        const paramBC = {
                            Address: params.Address,
                            PrivateKey: params.PrivateKey,
                            Student_ID: params.Student_ID,
                            ArrayClass: arr
                        }
                        //console.log(paramBC)
                        try {
                            const res = yield call(studentGetAllGrade, paramBC);
                            const { status, data } = res;
                            if (status === STATUS_CODE.SUCCESS) {
                                yield put(actionStudentGetAllGradeSuccess(data.final));
                            }
                        } catch (err) {
                            yield put(actionStudentGetAllGradeFail(err.message));
                        }
                    }
                } catch (err) {
                    yield put(actionStudentGetAllGradeFail(err.message));
                }
            }
        } catch (err) {
            yield put(actionStudentGetAllGradeFail(err.message));
        }
        yield put(hideLoading())
    }
}
/*function *watchGetGradeBlockchain(){
    while(true){
        const action = yield take(gradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN);
        const {params} = action.payload;
        try{
            const res = yield call(studentGradeBlockchain, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionStudentGetGradeBlockchainSuccess(data));
            }
        }catch(err){
            yield put(actionStudentGetGradeBlockchainFail(err.message));
        } 
    }
}*/

function* watchGetLecturerSchoolYear() {
    while (true) {
        const action = yield take(lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR);
        const { params } = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForLecturer, params)
        yield put(actionNumberRequest(res.data))
        try {
            const res = yield call(lecturerSchoolYear, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetLecturerSchoolYearSuccess(data));
            }
        } catch (err) {
            yield put(actionGetLecturerSchoolYearFail(err.message));
        }
    }
}
function* watchGetLecturerDetailCourse() {
    while (true) {
        const action = yield take(lecturerDetailCourseConstants.GET_LECTURE_DETAIL_COURSE);
        const { params } = action.payload;
        //console.log(params)
        try {
            const res = yield call(lecturerDetailCourse, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetLecturerDetailCourseSuccess(data));
            }
        } catch (err) {
            yield put(actionGetLecturerDetailCourseFail(err.message));
        }
    }
}
function* watchGetLecturerCourse() {
    while (true) {
        const action = yield take(lecturerCourseConstants.GET_LECTURER_COURSE);
        const { params } = action.payload;
        try {
            const res = yield call(lecturerCourse, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetLecturerCourseSuccess(data));
            }
        } catch (err) {
            yield put(actionGetLecturerCourseFail(err.message));
        }
    }
}
function* watchGetLecturerStudentClass() {
    while (true) {
        const action = yield take(lecturerStudentClassConstants.GET_LECTURER_STUDENT_CLASS);
        const { params } = action.payload;
        yield put(showLoading())
        const globalParams = params
        try {
            const res = yield call(lecturerStudentClass, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetLecturerStudentClassSuccess(data));
                if (!globalParams.OnlyTakeStudentClass) {
                    try {
                        const params = {
                            Address: '0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE',
                            PrivateKey: '2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e',
                            Class: globalParams.Class
                        }
                        const response = yield call(getStatus, params)
                        const { status, data } = response;
                        //console.log("Status: ", data)
                        if (status === STATUS_CODE.SUCCESS) {
                            //console.log("Lay duoc ISEditGrade")
                            yield put(actionLecturerShow({
                                IsEditGrade: data.status
                            }))
                            if (data.status[globalParams.ID] !== '0') {
                                const params = {
                                    Address: '0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE',
                                    PrivateKey: '2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e',
                                    Class: globalParams.Class
                                }
                                const respon = yield call(lecturerGetClassGrade, params)
                                const { status, data } = respon;
                                if (status === STATUS_CODE.SUCCESS) {
                                    /*console.log(data.bangdiem)
                                    console.log("ID: ",globalParams)*/
                                    //lay diem hien tai cua cot do
                                    yield put(actionGetLecturerClassGradeSuccess(data.bangdiem[globalParams.ID]));
                                }
                            }
                            else {
                                yield put(actionGetLecturerClassGradeSuccess([]));
                            }
                        }
                    } catch (err) { }
                }
            }
    
        } catch (err) {
            yield put(actionGetLecturerStudentClassFail(err.message));
        }
        yield put(hideLoading())
    }

}
function* watchGetLecturerClassGrade() {
    while (true) {
        const action = yield take(lecturerClassGrade.GET_LECTURER_CLASS_GRADE);
        const { params } = action.payload;
        //console.log(params)
        yield put(showLoading())
        try {
            const res = yield call(lecturerDetailCourse, params.DetailCourse);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetLecturerDetailCourseSuccess(data));
                try {
                    const resp = yield call(lecturerStudentClass, params.StudentClass);
                    const { status, data } = resp;
                    if (status === STATUS_CODE.SUCCESS) {
                        yield put(actionGetLecturerStudentClassSuccess(data));
                        try {
                            // goi api blockchain lay diem cua mot lop
                            const respon = yield call(lecturerGetClassGrade, params.GetClassGradeBC)
                            const { status, data } = respon;
                            if (status === STATUS_CODE.SUCCESS) {
                                yield put(actionGetLecturerClassGradeSuccess(data));
                            }
                        } catch (err) {
                            yield put(actionGetLecturerClassGradeFail(err.message))
                        }
                    }
                } catch (err) {
                    yield put(actionGetLecturerClassGradeFail(err.message))
                }
            }
        } catch (err) {
            yield put(actionGetLecturerClassGradeFail(err.message));
        }
        yield put(hideLoading())
    }
}
//hien tai ko dung
function* watchLecturerUploadStudent() {
    while (true) {
        const action = yield take(lecturerUploadStudentConstants.UPLOAD_STUDENT);
        const { params } = action.payload;
        yield put(showLoading())
        try {
            const res = yield call(lecturerUploadStudent, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionUploadStudentSuccess(data));
                yield put(actionLecturerShow({
                    "IsUploadStudent": true
                }))
            }
        } catch (err) {
            yield put(actionUploadStudentFail(err.message));
        }
        yield put(hideLoading())
    }
}
//hien tai ko dung
function* watchLecturerUploadOutLine() {
    while (true) {
        const action = yield take(watchLecturerUploadOutLineConstants.UPLOAD_OUTLINE);
        const { params } = action.payload;
        yield put(showLoading())
        try {
            const res = yield call(lecturerUploadOutLine, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionUploadOutLineSuccess(data));
                yield put(actionLecturerShow({
                    "IsUploadOutline": true
                }))
            }
        } catch (err) {
            yield put(actionUploadOutLineFail(err.message));
        }
        yield put(hideLoading())
    }
}
function* watchLecturerUploadGrade() {
    while (true) {
        const action = yield take(watchLecturerUploadGradeConstants.UPLOAD_GRADE);
        const { params } = action.payload;
        //console.log(params); break;
        const globalParams = params
        yield put(showLoading())
        try {
            const response = yield call(getStatus, params)
            const { status, data } = response;
            //console.log("Status: ", data, params.id) 
            const statusBlockchain = data;
            const idOutLine = params.id
            //console.log(data.status[params.id], typeof data.status[params.id])
           // console.log(data.status, params.id);
            if (status === STATUS_CODE.SUCCESS) {
                let hasEnterd = data.status[params.id] //kiem tra xem cot do da nhap diem chua
                //console.log(hasEnterd)
                if (hasEnterd === '0' || hasEnterd === undefined) { // truong hop chua nhap diem cot do
                    console.log("Chay: ")
                    const res = yield call(getIsUpload, params);
                    const { status, data } = res;
                    if (status === STATUS_CODE.SUCCESS) {
                        if (data[0].Session_IsUpload === false) {
                            try {
                                //console.log("Goi api upload student va percent : ")
                                const res = yield call(lecturerUploadStudent, params);
                                const { status, data } = res;
                                if (status === STATUS_CODE.SUCCESS) {
                                    yield call(isUpload, params);
                                    yield put(actionUploadStudentSuccess(data));
                                    try {
                                        //console.log("Goi api upload grade: ")
                                        const res = yield call(lecturerUploadGrade, params);
                                        const { status, data } = res;
                                        if (status === STATUS_CODE.SUCCESS) {
                                            yield put(actionUploadGradeSuccess(data));
                                            yield put(actionLecturerShow({
                                                "IsShow": false
                                            }))
                                            yield put(hideLoading())
                                        }
                                    } catch (err) {
                                        yield put(actionUploadGradeFail(err.message));
                                    }
                                }
                            } catch (err) {
                                yield put(actionUploadGradeFail(err.message));
                            }
                        } else {
                            try {
                                //console.log("Goi api upload grade: ", params.Class)
                                const res = yield call(lecturerUploadGrade, params);
                                const { status, data } = res;
                                if (status === STATUS_CODE.SUCCESS) {
                                    //console.log("Grade", data)
                                    yield put(actionUploadGradeSuccess(data));
                                    yield put(actionLecturerShow({
                                        "IsShow": false
                                    }))
                                    yield put(hideLoading())
                                }
                            } catch (err) {
                                yield put(actionUploadGradeFail(err.message));
                            }
                        }
                    }

                } else {// truong hop cot do da nhap diem roi, giai quyet thông báo hoặc request
                    //check xem mon do da nhap diem thi cuoi ky hay chua hay chua
                    //console.log("Da nhap diem cot do roi")
                    let hashEnteredFinalTest = data.status[params.idFinalTest]
                    if (hashEnteredFinalTest === '0' || hashEnteredFinalTest === undefined) { // gui thong bao den nhung nguoi co lien quan
                        //goi api tao ra các thông bao trong database
                        //console.log("Chua nhap diem thi")
                        var date = new Date();
                        const pr = {
                            Session_ID: params.Session_ID,
                            OutLine_ID: params.outlineID,
                            DateTime: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                            Reason: globalParams.Reason

                        }
                        //tao announce
                        //console.log(pr)
                        try {
                            //console.log("Tao thong bao")
                            const res = yield call(makeAnnounce, pr)
                            const { status } = res;

                            if (status === STATUS_CODE.SUCCESS) {
                                try {
                                   // console.log("Tao xong thong bao")
                                    //console.log("Goi api upload grade: ", params.Class)
                                    const res = yield call(lecturerUploadGrade, params);
                                    const { status, data } = res;
                                    if (status === STATUS_CODE.SUCCESS) {
                                       // console.log("Grade", data)
                                        yield put(actionUploadGradeSuccess(data));
                                        yield put(actionLecturerShow({
                                            "IsShow": false
                                        }))
                                        yield put(hideLoading())
                                    }
                                } catch (err) {
                                    yield put(actionUploadGradeFail(err.message));
                                }
                            }
                        } catch (err) {
                            yield put(actionUploadGradeFail(err.message));
                        }



                    } else { //tao ra cac request cho nhung nguoi co lien quan
                        //kiem tra xem co dang trong thoi gian xu ly request hay ko 
                        let Requesting = statusBlockchain.status[idOutLine]
                        console.log("Tao request")
                        //kiem tra xem da submit request chua , neu dean va pdt da xu li 
                        const res = yield call(checkPhienRequest, {
                            OutLine_ID: globalParams.outlineID
                        })
                        const { data, status } = res;
                        if (status === STATUS_CODE.SUCCESS) {
                            //console.log("DATA: ", data)
                            if (Requesting === '2' || Requesting === '3' || Requesting === '-1' || data !== null) {
                                console.log("trong rquest cu")
                                yield put(actionUploadGradeSuccess(null));
                                yield put(actionLecturerShow({
                                    "IsShow": false
                                }))
                                yield put(hideLoading())
                                //alert('Ban da request sua cot diem nay truoc do. Cho doi phan hoi truoc khi tiep tuc request')
                                toastify.toastifyError("Your previous request is still in processing")
                            } else { // truong hop khogn trong phien rrquest
                                //tao request tren blockchain
                                console.log("new request")
                                const a = {
                                    Address: globalParams.Address,
                                    PrivateKey: globalParams.PrivateKey,
                                    id: globalParams.id,
                                    Class: globalParams.Class,
                                }
                                const sendReq = yield call(sendRequest, a)
                                const { status } = sendReq
                                if (status === STATUS_CODE.SUCCESS) {
                                    //console.log("Da tao request tren blockchain")
                                    try {
                                        let gradeString = '';
                                        for (let i = 0; i < params.ArrayGrade.length; i++)
                                            if (i === params.ArrayGrade.length - 1) {
                                                gradeString = gradeString + params.ArrayGrade[i];
                                            } else {
                                                gradeString = gradeString + params.ArrayGrade[i] + "-"
                                            }
                                        //console.log("Grade: ", gradeString)
                                        //console.log("Tao request trong db")
                                        //lay ra diem hien tai
                                        const res = yield call(lecturerGetClassGrade, a)
                                        const { status, data } = res;
                                        if (status === STATUS_CODE.SUCCESS) {
                                            //console.log("Data lay diem ve: ", data.bangdiem[globalParams.id])
                                            let oldGrade = '';
                                            for (let i = 0; i < data.bangdiem[globalParams.id].length; i++)
                                                if (i === params.ArrayGrade.length - 1) {
                                                    oldGrade = oldGrade + data.bangdiem[globalParams.id][i];
                                                } else {
                                                    oldGrade = oldGrade + data.bangdiem[globalParams.id][i] + "-"
                                                }
                                            //console.log(oldGrade)
                                            let d = new Date();
                                            let dateTime = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
                                            const dl = {
                                                Lecturer_ID: params.Lecturer_ID,
                                                Session_ID: params.Session_ID,
                                                OutLine_ID: params.outlineID,
                                                DateTime: dateTime,
                                                STT: globalParams.id,
                                                Grade: gradeString,
                                                OldGrade: oldGrade,
                                                Reason: globalParams.Reason
                                            }
                                            //console.log(dl)
                                            const res = yield call(makeRequest, dl)
                                            const { status } = res;
                                            yield put(hideLoading())
                                            if (status === STATUS_CODE.SUCCESS) {
                                                //console.log("Tao thanh cong request")
                                                yield put(actionUploadGradeSuccess(null));
                                                yield put(actionLecturerShow({
                                                    "IsShow": false
                                                }))

                                                //alert('Ban da yeu cau sua diem. Ban se nhan duoc thong bao khi duoc chap thuan')
                                                toastify.toastifySuceess("Request to change grade successfully")
                                            }
                                        }
                                        //tao thoi gian

                                        // console.log(params.ArrayGrade)

                                        /*const res = yield call(makeRequest, dl)
                                        const {status} = res;
                                        yield put(hideLoading())
                                        if(status === STATUS_CODE.SUCCESS){
                                            console.log("Tao thanh cong request")
                                            yield put(actionUploadGradeSuccess(null));
                                            yield put(actionLecturerShow({
                                                "IsShow": false
                                            }))
                                            
                                            alert('Ban da yeu cau sua diem. Ban se nhan duoc thong bao khi duoc chap thuan')
                                        }*/
                                    } catch (err) { }

                                }

                            }
                        }

                        //can xem xet lai
                    }
                }
            }
        } catch (err) { }


    }

}
function* watchGetDeanSchoolYear() {
    while (true) {
        const action = yield take(deanSchoolYearConstants.GET_DEAN_SCHOOL_YEAR);
        const { params } = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForDean, params)
        yield put(actionNumberRequest(res.data))
        try {
            const res = yield call(deanSchoolYear, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetDeanSchoolYearSuccess(data));
            }
        } catch (err) {
            yield put(actionGetDeanSchoolYearFail(err.message));
        }
    }
}
function* watchGetDeanCourse() {
    while (true) {
        const action = yield take(deanCourseConstants.GET_DEAN_COURSE);
        const { params } = action.payload;
        //console.log(params)
        try {
            const res = yield call(deanCourse, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                yield put(actionGetDeanCourseSuccess(data));
            }
        } catch (err) {
            yield put(actionGetDeanCourseFail(err.message));
        }
    }
}

function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    let splitstring = string.split(" ");
    for (let i = 0; i < splitstring.length; i++)
        temp += splitstring[i];
    return temp;
}
function changeLeterSemester(letter) {
    if (letter === 1)
        return 'I';
    else if (letter === 2)
        return "II";
    return "Summer"
}

export default rootSaga;
