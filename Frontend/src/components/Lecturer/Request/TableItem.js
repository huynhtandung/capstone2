import React from 'react';
import { connect } from 'react-redux'
import * as acceptRequest from '../../../actions/GetRequest/acceptRequest'
import * as lecturerRequestUploadGrade from '../../../actions/GetRequest/lecturerRequestUploadGrade'
import * as lecturerUpdateRequest from '../../../actions/GetRequest/updateRequestDBForLecturer'
import { bindActionCreators } from 'redux';
import * as actionGetStudent from '../../../actions/lecturerGetStudentClass';
import * as actionNumberRequest from '../../../actions/GetRequest/numberRequest'
import * as toasty from '../../../commons/toastify'
import * as apiPrivateKey from '../../../apis/GetPrivateKey/getPrivatekey'
import './styles.css'
var CryptoJS = require('crypto-js')
class TableItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			renderAgain: false,
		}
	}
	changeLeterSemester = (letter) => {
		if (letter === 1)
			return 'I';
		else if (letter === 2)
			return "II";
		return "Summer"
	}
	ignoreSpaces(string) {
		var temp = "";
		string = '' + string;
		let splitstring = string.split(" ");
		for (let i = 0; i < splitstring.length; i++)
			temp += splitstring[i];
		return temp;
	}

	onSubmitGrade = (data) => {
		if (document.getElementById("key").value === '') {
			toasty.toastifyError("Please Provide Your Private Key")
			return;
		}
		//nhap sai
		const pv = {
			Table: "Lecturer",
			KeyID: "Lecturer_ID",
			//ValueID: sessionStorage.getItem('id'),
			ValueID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			PrivateKey: this.ignoreSpaces(document.getElementById('key').value)
		}

		apiPrivateKey
			.getPrivateKey(pv)
			.then(res => {
				if (res.data !== null) {
					//update request db truoc
					const { lecturerUpdateRequestCreators } = this.props;
					const { actionUpdateRequestDBForLecturer } = lecturerUpdateRequestCreators;
					actionUpdateRequestDBForLecturer({
						ID: data.ID,
						Type: 'Lecturer',
						Value: 1,
						Session_ID: data.Session_ID,
						OutLine_ID: data.OutLine_ID,
					})
					const { actionNumberRequestCreators } = this.props
					const { actionUpdateNumberRequest } = actionNumberRequestCreators
					actionUpdateNumberRequest({})
					this.setState({
						renderAgain: !this.state.renderAgain
					})

					//upload grad blockchain
					const arrayGrade = data.Grade.split("-")
					const paramBC = {
						Address: this.ignoreSpaces(res.data.WalletAddress),
						PrivateKey: this.ignoreSpaces(document.getElementById('key').value),
						Class: this.ignoreSpaces(`${data.Session_Year}-${this.changeLeterSemester(data.Session_Semester)}-${data.Session_ID}-${data.Course_ID}`),
						id: data.STT,
						ArrayGrade: arrayGrade,
						outlineID: data.OutLine_ID
					}
					console.log(paramBC)
					const { lecturerRequestUploadGradeCreators } = this.props;
					const { actionLecturerRequestUploadGrade } = lecturerRequestUploadGradeCreators
					actionLecturerRequestUploadGrade(paramBC)
				} else {
					toasty.toastifyError("Incorrect Private Key")
				}
			}
		)
	}
	onCancelSubmitGrade = (data) => {
		if (document.getElementById("key").value === '') {
			toasty.toastifyError("Please Provide Your Private Key")
			return;
		}
		//nhap sai
		const pv = {
			Table: "Lecturer",
			KeyID: "Lecturer_ID",
			//ValueID: sessionStorage.getItem('id'),
			ValueID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			PrivateKey: document.getElementById('key').value
		}
		apiPrivateKey
			.getPrivateKey(pv)
			.then(res => {
				if (res.data !== null) {
					const { lecturerUpdateRequestCreators } = this.props;
					const { actionUpdateRequestDBForLecturer } = lecturerUpdateRequestCreators;
					actionUpdateRequestDBForLecturer({
						ID: data.ID,
						Type: 'Lecturer',
						Value: -1
					})
					const { actionNumberRequestCreators } = this.props
					const { actionUpdateNumberRequest } = actionNumberRequestCreators
					actionUpdateNumberRequest({})
					this.setState({
						renderAgain: !this.state.renderAgain
					})
				} else {
					toasty.toastifyError("Incorrect Private Key")
				}
			}
		)

	}
	onOK = (data) => {
		const { lecturerUpdateRequestCreators } = this.props;
		const { actionUpdateRequestDBForLecturer } = lecturerUpdateRequestCreators;
		actionUpdateRequestDBForLecturer({
			ID: data.ID,
			Type: 'Lecturer',
			Value: -1
		})
		const { actionNumberRequestCreators } = this.props
					const { actionUpdateNumberRequest } = actionNumberRequestCreators
					actionUpdateNumberRequest({})
					this.setState({
						renderAgain: !this.state.renderAgain
					})
		this.setState({
			renderAgain: !this.state.renderAgain
		})

	}

	getStudent = (data) => {
		const { actionGetStudentC } = this.props;
		const { actionGetLecturerStudentClass } = actionGetStudentC;
		actionGetLecturerStudentClass({
			Session_ID: data.Session_ID,
			OnlyTakeStudentClass: true,
		})
		this.props.currentRequest(data)
	}
	render() {
		var date = new Date();
		var curentDay = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
		return (
			<tr className = {this.props.data.DateTime.split(' ')[1] ===  curentDay ? "active_an htd" : "htd"}>
				<td>{this.props.stt}</td>
				<td>
					<span>
						{
							this.props.data.AcceptByDean === -1 || this.props.data.AcceptByPDT === -1
								? "Your request to edit the grade of " + this.props.data.OutLine_Name + " - " +
								this.props.data.Course_Name + " has been denied"
								: "Your request to edit the grade of " + this.props.data.OutLine_Name + " - " +
								this.props.data.Course_Name + " has been approved"
						}
					</span>
				</td>
				<td>
					<span className="label label-info" onClick={() => this.getStudent(this.props.data)} data-toggle="modal" data-target="#myModal" >Detail</span>
				</td>
				<td>
					{this.props.data.DateTime}
				</td>
				<td>
					{
						this.props.data.HasUpload === 0 && this.props.data.AcceptByDean !== -1 && this.props.data.AcceptByPDT !== -1
							? <div>
								<input type="text" placeholder="Provide your private key" required="required" id="key"  class="form-control"/><br />
								<button type="button" onClick={() => this.onSubmitGrade(this.props.data)} className="btn btn-info lk1">Submit</button>
								<button type="button" onClick={() => this.onCancelSubmitGrade(this.props.data)} className="btn btn-warning lk2">Cancel</button>
							</div>

							: ((this.props.data.AcceptByDean === -1 && this.props.data.AcceptByPDT === -1 && this.props.data.HasUpload === 0)
								||(this.props.data.AcceptByDean === -1 && this.props.data.AcceptByPDT === 1 && this.props.data.HasUpload === 0)
								||(this.props.data.AcceptByDean === 1 && this.props.data.AcceptByPDT === -1 && this.props.data.HasUpload === 0)
								)

								? <button type="button" id="onOK" onClick={() => this.onOK(this.props.data)} className="btn btn-default ld">OK</button>

								: this.props.data.HasUpload === '1' || this.props.data.HasUpload === 1
									? "Submitted"
									: "Canceled"

					}
				</td>
			</tr>
		)
	}
}
const mapStateToProps = state => {
	return {
		//requests : state.getRequest
	};
};
const mapDispatchToProps = dispatch => {
	return {
		acceptRequestCreators: bindActionCreators(acceptRequest, dispatch),
		lecturerRequestUploadGradeCreators: bindActionCreators(lecturerRequestUploadGrade, dispatch),
		lecturerUpdateRequestCreators: bindActionCreators(lecturerUpdateRequest, dispatch),
		actionGetStudentC: bindActionCreators(actionGetStudent, dispatch),
		actionNumberRequestCreators: bindActionCreators(actionNumberRequest, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);