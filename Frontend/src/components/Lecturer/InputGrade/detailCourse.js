/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionStudentClass from '../../../actions/lecturerGetStudentClass';
import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow';

import * as actionUploadStudent from '../../../actions/lecturerUploadStudent';
import * as actionUploadOutLine from '../../../actions/lecturerUploadOutline';
import * as actionUploadGrade from '../../../actions/lecturerUploadGrade';

import * as actionLecturerDetailCourse from '../../../actions/lecturerGetDetailCourse';

import readXlsxFile from 'read-excel-file'

import * as toastify from '../../../commons/toastify';
import * as apiPrivateKey from '../../../apis/GetPrivateKey/getPrivatekey'







import './detailCourse.css';
//import { lecturerUploadStudent } from '../../../apis/lecturerUploadStudent';

//Luu danh sach diem cua sinh vien
const data = []

var CryptoJS = require('crypto-js')
class Test extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "--Select CourseWork Title--",
			check: false,
			"fileStudent": null,
			"fileOutline": null,
			render: 0,
			idUploadGrade: '',
			renderAgain: false,
			outlineID: '',
			autoFocus: '',
			Student_Name: ''
		}
	}
	renderStudent = (record, title, index, outlineID) => {
		if (this.props.outline !== "") {

		}
		this.setState({
			idUploadGrade: index,
			outlineID: outlineID
		})
		//if(this.state.check === false){
		const { actionGetStudentClassCreator } = this.props;
		const { actionGetLecturerStudentClass } = actionGetStudentClassCreator;
		actionGetLecturerStudentClass({
			"Session_ID": record.OutLine_Session_ID,
			Class: this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`),
			ID: index
		})
		//console.log("Lay danh sach sinh vien")
		//}
		this.setState({
			title: title,
			check: true
		})

		const { actionLecturerHandleShowCreator } = this.props;
		const { actionLecturerShow } = actionLecturerHandleShowCreator
		console.log("Dispatch action handle show : Index", index)
		actionLecturerShow({
			"Course": null,
			"IsShow": true,
			"Title": title,
			"stt": index
		});
		this.setState({
			renderAgain: !this.state.renderAgain
		})

		//set cai upload file thanh null
	}
	renderGrade = (outline) => {
		//console.log(outline)
		let xhtml = null;
		if (outline.length > 0) {
			xhtml = outline.map((record, index) => {
				let title = `${record.OutLine_Name} - ${record.OutLine_Percent}% `;
				//console.log(record.IsFinalTest)
				if (record.IsFinalTest !== true)
					return (
						<li key={index}>
							<button onClick={() => this.renderStudent(record, title, index, record.OutLine_ID)} type="button" className="btn btn-default li-outline">{record.OutLine_Name} - {record.OutLine_Percent}%</button>
						</li>
					)
				else
					return (
						<li key={index}>
							<button type="button" className="btn btn-default li-outline" disabled>{record.OutLine_Name} - {record.OutLine_Percent}%</button>
						</li>
					)
			})
			if (document.getElementById("input") !== null)
				document.getElementById("input").value = ""
		}
		if (xhtml === null)
			xhtml = "None - Please upload outline"
		//console.log(xhtml)
		return xhtml;
	}

	onChange = (event) => {

		var target = event.target;
		var name = target.name;
		var value = target.value;
		var ele = document.getElementsByName(name)[0];
		if (ele !== null) {
			//ele.setAttribute('value', value)
			//console.log(ele, value)
		}
		if (Number(value) <= 10 && Number(value) >= 0)
			data[name] = value;
	}


	renderStudentClass = (listOfStudent) => {
		let xhtml = null;
		var date = new Date();
		var endDate = new Date(this.props.lecturerHandleShow.Course.Session_End_Date)
		//console.log(date)
		//console.log(endDate)
		if (listOfStudent.length !== 0) {
			this.props.studentClass.map((student, index) => {
				var element = document.getElementById(String(student.JS_Student_ID))
				if (element !== null) {
					data[element.getAttribute('name')] = 0
					element.value = ""
				}
			})
			let newStudents = listOfStudent.sort(function (a, b) {
				return a.JS_Student_ID - b.JS_Student_ID
			})
			xhtml = newStudents.map((student, index) => {
				return (
					<tr key={index}>
						<td>{student.JS_Student_ID}</td>
						<td>{student.Student_Name}</td>
						<td>
							<input onChange={this.onChange} type="number" min="0" max="10" step="0.1" name={index} id={String(student.JS_Student_ID)} className="form-control" required="required" />
						</td>
					</tr>
				)
			})

			if (this.props.lecturerHandleShow.IsEditGrade[this.props.lecturerHandleShow.stt] !== '0' && this.props.lecturerHandleShow.IsEditGrade[this.props.lecturerHandleShow.stt] !== undefined) {

				//truong hop la sua diem tao the input nhap li do
				xhtml.push(
					<tr key={-2}>
						<td></td>
						<td>Provide the reason for editting the grade</td>
						<td>
							<textarea name="" id="reason" className="form-control" rows="3" required="required"></textarea>
						</td>
					</tr>
				)
				//hien thi diem cu vao the input
				//console.log(this.props.studentClass, this.props.grades)
				this.props.studentClass.map((student, index) => {
					var element = document.getElementById(String(student.JS_Student_ID))
					if (element !== null) {
						//console.log(element, this.props.grades[index])
						data[element.getAttribute('name')] = this.props.grades[index]
						//element.setAttribute('value', Number(this.props.grades[index]))
						element.value = Number(this.props.grades[index])
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
					<td className="turnright">
						<strong className="providekey">Provide your private key</strong>
					</td>
					<td>
						<input type="text" name="" id="txtPrivateKey" className="form-control" required="required" />
					</td>
				</tr>
			)
			xhtml.push(
				<tr key={-1}>
					<td>
					</td>
					<td>
					</td>
					<td>
						{
							date <= endDate
								? <button type="submit" className="btn btn-success btnsususu">Submit</button>
								: "The Session finished"
						}
					</td>
				</tr>
			)
		}
		/*if(document.getElementById("myForm") !== null)
			document.getElementById("myForm").reset()*/
		return xhtml;
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
			toastify.toastifyError("Malformed");
			this.props.studentClass.map((record, index) => {
				var element = document.getElementById(String(record.JS_Student_ID))
				data[element.getAttribute('name')] = 0;
				element.setAttribute('value', '')
				return 0;
			})
		}
	}

	ignoreSpaces(string) {
		var temp = "";
		string = '' + string;
		let splitstring = string.split(" ");
		for (let i = 0; i < splitstring.length; i++)
			temp += splitstring[i];
		return temp;
	}

	onSubmit = (event) => {
		event.preventDefault();
		//console.log(data)
		//console.log(document.getElementById('txtPrivateKey').value)
		const pv = {
			Table: "Lecturer",
			KeyID: "Lecturer_ID",
		//	ValueID: sessionStorage.getItem('id'),
			ValueID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			PrivateKey: document.getElementById('txtPrivateKey').value
		}
		apiPrivateKey
			.getPrivateKey(pv)
			.then(res => {
				if (res.data !== null) {
					console.log(res.data)
					let listOutLine = [];
					this.props.outline.map((outline, index) => {
						return listOutLine.push(`${outline.OutLine_ID} - ${outline.OutLine_Name} - ${outline.OutLine_Percent}`)
					})

					let listStudent = [];
					this.props.studentClass.map((student, index) => {
						return listStudent.push(student.JS_Student_ID)
					})

					//tim id cua cot final test
					//console.log(this.)
					let idFinal = -1;
					this.props.outline.map((record, index) => {
						if (record.isFinalTest !== null)
							idFinal = index;
					})



					const { actionUploadGradeCreators } = this.props;
					const { actionUploadGrade } = actionUploadGradeCreators;
					const params = {
						//Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
						//PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
						Address: this.ignoreSpaces(res.data.WalletAddress),
						PrivateKey: this.ignoreSpaces(res.data.PrivateKey),
						Class: this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`),
						ArrayGrade: data,
						id: this.props.lecturerHandleShow.stt,//cot diem thu may
						IsUpload: this.props.lecturerHandleShow.Course.Session_IsUploadStudent,
						ArrayPercent: listOutLine,
						ArrayStudent: listStudent.sort(),
						Session_ID: this.props.lecturerHandleShow.Course.Session_ID,
						outlineID: this.state.outlineID,
						idFinalTest: idFinal,
						//Lecturer_ID: sessionStorage.getItem('id'),
						Lecturer_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
						Reason: document.getElementById('reason') ? document.getElementById('reason').value : ""
					}
					//dong cai bang nhap diem
					//console.log(params)
					actionUploadGrade(params);

					const { actionLecturerHandleShowCreator } = this.props;
					const { actionLecturerShow } = actionLecturerHandleShowCreator
					actionLecturerShow({
						"IsShow": false,
					});


				} else {
					toastify.toastifyError('Incorrect Private Key');
				}
			})
			.catch(error => {
				toastify.toastifyError(error.message);
			}
			)



	}
	autoFocus = () => {
		var value = document.getElementById('autoFocus').value;
		this.setState({
			autoFocus: value
		})
	}
	inputGradeOneStudent = () => {
		let id = document.getElementById("txtID").value
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
		/*document.getElementById("txtID").value = ''
		document.getElementById("txtGrade").value = ''*/
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
				{

					this.props.showDetailGrade === false
						? ""
						:
						<div className="tongdiv">
							<div className="dropdown xoxuong">
								<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
									{this.props.lecturerHandleShow.Course.Course_Name}
									<span className="caret"></span>
								</button>
								<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
									{this.renderGrade(this.props.outline)}
								</ul>
							</div>
							{this.props.lecturerHandleShow.IsShow === false ? "" :
								<div className="ngoai">
									<div className="con1">
										
											<a className="btn btn-default btnupup" href={`http://127.0.0.1:8088/export-excel/${this.props.lecturerHandleShow.Course.Session_ID}`} role="button">List students</a>&nbsp;&nbsp;
											<strong className="uploadtitle dddd">Sample upload file</strong> <br />
										<input type="file" id="input" onChange={this.onChangeFile} />
									</div>
									<div className="con2">
										<form onSubmit={this.onSubmit} id="myForm">
											<div className="panel panel-default">
												<div className="panel-heading">
													<h3 className="titlexyz">{this.props.lecturerHandleShow.Title}</h3>
													<div className="form-inline conxx">
														<div className="form-group formxx1">
															<input onChange={() => this.onChangeName()} type="text" id="txtID" className="form-control" placeholder="Student ID" />
														</div>
														<div className="form-group formxx2">
															<input type="number" id="txtGrade" min="0" max="10" className="form-control" placeholder="Grade" />
														</div>
														<div className="form-group okok">
															<button type="button" onClick={() => this.inputGradeOneStudent()} className="btn btn-success">OK</button>
														</div>
														<div className="hhhh" id="studentName"></div>
													</div>
												</div>
												<div className="table-responsive">
													<table className="table table-bordered table-hover">
														<thead>
															<tr>
																<th>Student ID</th>
																<th>Student Name</th>
																<th>Grade</th>
															</tr>
														</thead>
														<tbody className="maincontentpoj">
															{this.renderStudentClass(this.props.studentClass)}
														</tbody>
													</table>

												</div>
											</div>
										</form>
									</div>
								</div>

							}
						</div>
				}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		showDetailGrade: state.studentIsShowDetailGrade,
		//course : state.lecturerCourse,
		studentClass: state.lecturerStudentClass,
		lecturerHandleShow: state.lecturerHandleShow,
		//nam hoc  hoc ky
		titleDropdown: state.titleDropdown,
		outline: state.lecturerDetailCourse,
		lecturerUploadGrade: state.lecturerUploadGrade,
		isShow: state.lecturerHandleShow.IsShow,
		grades: state.lecturerClassGrade

	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionGetStudentClassCreator: bindActionCreators(actionStudentClass, dispatch),
		actionLecturerHandleShowCreator: bindActionCreators(actionLecturerHandleShow, dispatch),
		lecturerUploadStudentCreators: bindActionCreators(actionUploadStudent, dispatch),
		//lay lai cau truc mon hoc khi da upload
		actionLecturerDetailCourseCreators: bindActionCreators(actionLecturerDetailCourse, dispatch),
		actionUploadOutLineCreators: bindActionCreators(actionUploadOutLine, dispatch),
		actionUploadGradeCreators: bindActionCreators(actionUploadGrade, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
