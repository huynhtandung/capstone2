import React from 'react';
import { connect } from 'react-redux'
import * as acceptRequest from '../../../actions/GetRequest/acceptRequest'
import * as updateRequest from '../../../actions/GetRequest/updateRequestDBForDean'
import { bindActionCreators } from 'redux';
import './styles.css'
//import Modal from '../../Modal/index'

import * as actionGetStudent from '../../../actions/lecturerGetStudentClass';
import * as actionNumberRequest from '../../../actions/GetRequest/numberRequest'
import * as toasty from '../../../commons/toastify'
import * as apiPrivateKey from '../../../apis/GetPrivateKey/getPrivatekey'

var CryptoJS = require('crypto-js')
class TableItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			renderAgain: false,
			key: ''
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

	handleAccept = (data, decision) => {
		//chua nhap private key
		if (document.getElementById("key").value === '') {
			toasty.toastifyError("Please Provide Your Private Key")
			return;
		}
		//nhap sai
		const pv = {
			Table: "Dean",
			KeyID: "Dean_Username",
			//ValueID: sessionStorage.getItem('id'),
			ValueID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			PrivateKey: this.ignoreSpaces(document.getElementById("key").value)
		}

		apiPrivateKey
			.getPrivateKey(pv)
			.then(res => {
				if (res.data !== null) {
					//goi api accept tren database => goi action update lai state
					const { updateRequestCreators } = this.props;
					const { actionUpdateRequestDBForDean } = updateRequestCreators;
					actionUpdateRequestDBForDean({
						Decision: Number(decision) === 1 ? decision : -1,
						ID: data.ID,
						Type: 'Dean'
					})
					const { actionNumberRequestCreators } = this.props
					const { actionUpdateNumberRequest } = actionNumberRequestCreators
					actionUpdateNumberRequest({})
					this.setState({
						renderAgain: !this.state.renderAgain
					})

					//goi api accept tren blockchain
					const { acceptRequestCreators } = this.props;
					const { actionAcceptRequest } = acceptRequestCreators;
					const paramBC = {
						Address: this.ignoreSpaces(res.data.WalletAddress),
						PrivateKey: this.ignoreSpaces(document.getElementById("key").value),
						Decision: Number(decision),
						id: data.STT,
						Class: this.ignoreSpaces(`${data.Session_Year}-${this.changeLeterSemester(data.Session_Semester)}-${data.Session_ID}-${data.Course_ID}`)
					}
					//console.log(paramBC)
					actionAcceptRequest(paramBC)
				} else {
					toasty.toastifyError("Incorrect Private Key")
				}

			}
		)

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
			<tr className={ this.props.data.DateTime.split(' ')[1] ===  curentDay ? "active_an" : ""}>
				<td>{this.props.stt}</td>
				<td>
					<span>
						{"Lecturer " + this.props.data.Lecturer_Name + " - " +
							this.props.data.Dep_Name + " has requested to edit the grade of " + this.props.data.OutLine_Name
							+ " - " + this.props.data.Course_Name
						}
					</span>
				</td>
				<td>
					<span className="label label-info" onClick={() => this.getStudent(this.props.data)} data-toggle="modal" data-target="#myModal" >Detail</span>
				</td>
				<td>
					{this.props.data.Reason}
				</td>
				<td>
					{this.props.data.DateTime}
				</td>
				<td>
					{
						this.props.data.AcceptByDean === 0
							? (
								<div>
									<input type="text" placeholder="Provide your private key" className="form-control" required="required" id="key" /><br />
									<button type="button" onClick={() => this.handleAccept(this.props.data, 1)} className="btn btn-success lk1">Accept</button>
									&nbsp;&nbsp;&nbsp;<button type="button" onClick={() => this.handleAccept(this.props.data, 0)} className="btn btn-warning">Deny</button>
								</div>
							)
							: this.props.data.AcceptByDean === 1
								? "Accepted"
								: "Denied"
					}
				</td>
			</tr>

		)

	}
}
const mapStateToProps = state => {
	return {
		requests: state.getRequest
	};
};
const mapDispatchToProps = dispatch => {
	return {
		acceptRequestCreators: bindActionCreators(acceptRequest, dispatch),
		updateRequestCreators: bindActionCreators(updateRequest, dispatch),
		actionGetStudentC: bindActionCreators(actionGetStudent, dispatch),
		actionNumberRequestCreators: bindActionCreators(actionNumberRequest, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);