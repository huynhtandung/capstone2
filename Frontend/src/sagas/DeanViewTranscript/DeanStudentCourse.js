import { take, call, put} from 'redux-saga/effects';
import * as deanViewTranscriptConstants from '../../constants/DeanViewTranscript/deanViewTranscript';
import {deanStudentCourse} from '../../apis/DeanViewTranscript/deanViewTranscript'
import {actionGetDeanStudentCourseSuccess, actionGetDeanStudentCourseFail} from '../../actions/DeanViewTranscript/deanStudentCourse';

import {STATUS_CODE} from '../../constants/index';


import {studentGetAllGrade} from '../../apis/studentGetAllGrade';
import {actionStudentGetAllGradeSuccess, actionStudentGetAllGradeFail} from '../../actions/studentGetAllGrade';

import {showLoading, hideLoading } from '../../actions/loading';

import {studentSchoolYear} from '../../apis/studentSchoolYear';
import {actionGetStudentSchoolYearSuccess} from '../../actions/studentGetSchoolYear';


 export default function * watchDeanStudentCourse(){
    while(true){
        const action = yield take(deanViewTranscriptConstants.GET_DEAN_STUDENT_COURSE);
        const {params} = action.payload;
        yield put(showLoading())
        try{
            const pr = {
                Student_ID : params.Student_ID
            }
            const res = yield call(studentSchoolYear, pr)
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetStudentSchoolYearSuccess(data))
                try{
                    const res = yield call(deanStudentCourse, params);
                    const {status, data} = res;
                    if(status === STATUS_CODE.SUCCESS){
                        yield put(actionGetDeanStudentCourseSuccess(data));
                        let arr = [];
                        data.map((record, index)=>{
                            return arr.push(ignoreSpaces(`${record.Session_Year}-${changeLeterSemester(record.Session_Semester)}-${record.Session_ID}-${record.Course_ID}`))
                        })
                        const paramBC = {
                            Address : params.Address,
                            PrivateKey : params.PrivateKey,
                            Student_ID : params.Student_ID,
                            ArrayClass : arr
                        }
                        
                        try{
                            const res = yield call(studentGetAllGrade, paramBC);
                            const {status, data} = res;
                            if(status === STATUS_CODE.SUCCESS){
                                yield put(actionStudentGetAllGradeSuccess(data.final));
                            }
                        }catch(err){
                            yield put(actionStudentGetAllGradeFail(err.message));
                        }
                    }
                }catch(err){
                    yield put(actionGetDeanStudentCourseFail(err.message));
                } 
            }
        }catch(err){
            yield put(actionGetDeanStudentCourseFail(err.message));
        }
        yield put(hideLoading())
    }
}

function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    let splitstring = string.split(" ");
    for(let i = 0; i < splitstring.length; i++)
    temp += splitstring[i];
    return temp;
}

function changeLeterSemester(letter){
    if(letter === 1)
        return 'I';
    else if(letter === 2)
        return "II";
    return "Summer"
}