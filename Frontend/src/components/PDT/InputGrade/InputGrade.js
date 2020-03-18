/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionPDTHandleShow from '../../../actions/PDTInputGrade/pdtHandleShow'
import * as actionPDTSubmitGrade from '../../../actions/PDTInputGrade/pdtSubmitGrade'
import * as toastify from '../../../commons/toastify';
import readXlsxFile from 'read-excel-file'
import './detailCourse.css';

import * as apiPrivateKey from '../../../apis/GetPrivateKey/getPrivatekey'

const data = []
var CryptoJS = require('crypto-js')
class InputGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderAgain: false,

        }
    }
    renderOutline = (outline) => {
        let mark = false;
        let xhtml = [];
        if (outline !== "") {
            outline.map((record, index) => {
                if (record.IsFinalTest === true) {
                    //set la da co cot final test
                    mark = true;
                    return xhtml.push(
                        <th key={index}>
                            {record.OutLine_Name}
                        </th>
                    )
                }
                else {
                    return ''
                }
            })
        }
        if (xhtml.length === 0) {
            xhtml = (
                <th>
                    No Final Test For This Course
                </th>
            )
        }

        const { actionPDTHandleShowCreators } = this.props;
        const { actionDeanHandleShow } = actionPDTHandleShowCreators;
        actionDeanHandleShow({
            hadFinalExam: mark
        })
        return xhtml;
    }

    renderClass = (students) => {
        if (this.props.outline !== "") {
            let xhtml = null;
            var date = new Date();
            var endDate = new Date(this.props.pdtHandleShow.Course.Session_End_Date)
            if (students.length > 0) {
                let newStudents = students.sort(function (a, b) {
                    return a.JS_Student_ID - b.JS_Student_ID
                })
                xhtml = newStudents.map((student, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.JS_Student_ID}</td>
                            <td>{student.Student_Name}</td>
                            <td>
                                {this.props.pdtHandleShow.hadFinalExam
                                    ? <input onChange={this.onChange} type="number" min="0" max="10" step="0.1" id={String(student.JS_Student_ID)} name={index} className="form-control" required="required" />
                                    : ''
                                }
                            </td>
                        </tr>
                    )
                })

                //kiem tra cot cuoi ky la id thu may
                let id = -1;
                this.props.outline.map((record, index) => {
                    if (record.IsFinalTest === true) {
                        id = index
                    }
                })
                if (id !== -1 && this.props.grades.length > 0) {
                    /*console.log(id)
                    console.log(this.props.grades)*/
                    if (this.props.grades[id][0] !== "") {
                        xhtml.push(
                            <tr key={-2}>
                                <td></td>
                                <td></td>
                                <td>Provide a reason for editting the grade</td>
                                <td>
                                    <textarea name="" id="reason" className="form-control" rows="3" required="required"></textarea>
                                </td>
                            </tr>
                        )
                    }
                    this.props.studentClass.map((student, index) => {
                        var element = document.getElementById(String(student.JS_Student_ID))
                        if (element !== null) {
                            console.log(this.props.grades)
                            //console.log(element, this.props.grades[index])
                            data[element.getAttribute('name')] = this.props.grades[id][index]
                            element.setAttribute('value', (this.props.grades[id][index]) !== "" ? Number(this.props.grades[id][index]) : '')
                        }
                    })
                } else {
                    this.props.studentClass.map((student, index) => {
                        var element = document.getElementById(String(student.JS_Student_ID))
                        if (element !== null) {
                            data[element.getAttribute('name')] = 0
                            element.setAttribute('value', '')
                        }
                    })
                }
                xhtml.push(
                    <tr key={-10}>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td className="turnright">
                        <strong className="providekey">Provide your private key</strong>
                        </td>
                        <td>
                            <input type="text" name="" id="txtPrivateKey" className="form-control" required="required" />
                        </td>
                    </tr>
                )
                // eslint-disable-next-line no-unused-expressions
                this.props.pdtHandleShow.hadFinalExam
                    ?
                    xhtml.push(
                        <tr key={-1}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                {
                                    date <= endDate
                                        ? <button type="submit" className="btn btn-success">Submit</button>
                                        : "The Session finished"
                                }
                            </td>
                        </tr>
                    )
                    : ''
            }
            return xhtml;
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        data[name] = value;
    }

    onSubmit = (event) => {
        event.preventDefault();
        //console.log(data)
        const pv = {
            Table: "AcademicAffairsDepartment",
            KeyID: "AAD_Username",
            //ValueID: sessionStorage.getItem('id'),
            ValueID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
            PrivateKey: document.getElementById('txtPrivateKey').value
        }
        apiPrivateKey
            .getPrivateKey(pv)
            .then(res => {
                if (res.data !== null) {
                    let x = 0;
                    let outlineID = ''
                    this.props.outline.map((record, index) => {
                        if (record.IsFinalTest === true) {
                            x = index;
                            outlineID = record.OutLine_ID
                        }
                    })
                    //lay id cot thu may
                    let idFinal = -1;
                    this.props.outline.map((record, index) => {
                        if (record.isFinalTest !== null)
                            idFinal = index;
                    })
                    //submit diem len blockchain
                    const params = {
                        Address: this.ignoreSpaces(res.data.WalletAddress),
                        PrivateKey: this.ignoreSpaces(res.data.PrivateKey),
                        Class: this.ignoreSpaces(`${this.props.pdtHandleShow.Year}-${this.props.pdtHandleShow.Semester}-${this.props.pdtHandleShow.Course.Session_ID}-${this.props.pdtHandleShow.Course.Course_ID}`),
                        ArrayGrade: data,
                        id: x,//cot diem thu may
                        outlineID: outlineID,
                        Session_ID: this.props.pdtHandleShow.Course.Session_ID,
                        idFinalTest: idFinal,
                        Reason: document.getElementById('reason') ? document.getElementById('reason').value : ""
                    }

                    const { actionPDTSubmitGradeCreators } = this.props;
                    const { actionPDTSubmitGrade } = actionPDTSubmitGradeCreators;

                    actionPDTSubmitGrade(params)
                } else {
                    toastify.toastifyError('Incorrect Private Key');
                }
            }
            )

    }

    ignoreSpaces(string) {
        var temp = "";
        string = '' + string;
        let splitstring = string.split(" ");
        for (let i = 0; i < splitstring.length; i++)
            temp += splitstring[i];
        return temp;
    }

    onChangeFile = (event) => {
        //setTimeout(function(){ document.getElementById("myForm").reset() }, 1000);
        const input = document.getElementById('input')
        if (input.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            readXlsxFile(input.files[0]).then((excelData) => {
                if (excelData.length > 0) {
                    excelData.map((record, index) => {
                        var element = document.getElementById(String(record[0]))
                        if (element !== null) {
                            if (Number(record[2]) >= 0 && Number(record[2]) <= 10) {
                                data[element.getAttribute('name')] = String(record[2])
                                element.setAttribute('value', record[2])
                            }
                        }
                        return 0;
                    })
                }
            })
            document.getElementById("myForm").reset()
        }
        else {
            toastify.toastifyError("File khong dung dinh dang");
            this.props.studentClass.map((record, index) => {
                var element = document.getElementById(String(record.JS_Student_ID))
                data[element.getAttribute('name')] = 0;
                element.setAttribute('value', '')
                return 0;
            })
        }
    }
    inputGradeOneStudent = () => {
		/*let id = document.getElementById("txtID").value
		let grade = document.getElementById("txtGrade").value
		var element = document.getElementById(id)
		if(element !== null){
			data[element.getAttribute('name')] = grade;
			element.setAttribute('value', grade)
			toastify.toastifySuceess("Success")
		}else{
			toastify.toastifyError("Not Found")
		}*/let id = document.getElementById("txtID").value
        let grade = document.getElementById("txtGrade").value
        if (grade < 1 || grade > 10) {
            toastify.toastifyError("Grade is more than 1 and less than 10")
        } else {
            var element = document.getElementById(id)
            if (element !== null) {
                data[element.getAttribute('name')] = grade;
                //element.setAttribute('value', grade)
                element.value = grade
                toastify.toastifySuceess("Success")
                //console.log(data)
            } else {
                toastify.toastifyError("Not Found")
            }
        }
		/*document.getElementById("txtID").setAttribute('value', null)
		document.getElementById("txtGrade").setAttribute('value', null)*/
    }
    onChangeName = (event) => {
        //console.log('cc')
        var name = document.getElementById("txtID").value;
        //var check = "";
        for (let i = 0; i < this.props.studentClass.length; i++) {
            if (this.props.studentClass[i].JS_Student_ID === name) {
                document.getElementById("studentName").innerHTML = this.props.studentClass[i].Student_Name
                //check = this.props.studentClass[i].Student_Name;
                return;
            }
        }
        document.getElementById("studentName").innerHTML = ''
    }
    render() {
        return (
            <div>
                {this.props.isShow === false ? ""
                    :
                    <div className="ngoai ngoainaofi">
                        <div className="con1 conuiuuu">
                            
                            <a className="btn btn-default btnupup" href={`http://127.0.0.1:8088/export-excel/${this.props.pdtHandleShow.Course.Session_ID}`} role="button">List students</a>
                            &nbsp;&nbsp;&nbsp;<strong className="uploadtitle">Sample upload file</strong> &nbsp;&nbsp;
                            <input type="file" id="input" onChange={this.onChangeFile} />
                        </div>
                        <br />
                        <div className="con2">
                            <form onSubmit={this.onSubmit} id="myForm">
                                <div className="panel panel-default">
                                    <div className="panel-heading"><h3 className="titlexyz">Final Exam</h3>
                                    <div className="form-inline conxx conyyy">
                                            <div className="form-group formxx1">
                                                <input onChange={() => this.onChangeName()} type="text" id="txtID" className="form-control" placeholder="Student ID" />
                                            </div>
                                            
                                            <div className="form-group formxx2">
                                                <input type="text" id="txtGrade" className="form-control" placeholder="Grade" />
                                            </div>
                                            <div className="form-group okok">
                                                <button type="button" onClick={() => this.inputGradeOneStudent()} className="btn btn-success">OK</button>
                                            </div>
                                            <div id="studentName" className="oiuo bbbb"></div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    {this.renderOutline(this.props.outline)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderClass(this.props.studentClass)}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        studentClass: state.lecturerStudentClass,
        outline: state.lecturerDetailCourse,
        pdtHandleShow: state.pdtHandleShow,
        isShow: state.pdtHandleShow.showStudentClass,
        grades: state.lecturerClassGrade
    };
};
const mapDispatchToProps = dispatch => {
    return {
        actionPDTHandleShowCreators: bindActionCreators(actionPDTHandleShow, dispatch),
        actionPDTSubmitGradeCreators: bindActionCreators(actionPDTSubmitGrade, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputGrade);
