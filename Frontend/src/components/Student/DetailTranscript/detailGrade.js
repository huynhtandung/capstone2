/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionGetTransaction from '../../../actions/Transaction/transaction'
import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow'
import {bindActionCreators} from 'redux';
import * as actionStudentClass from '../../../actions/lecturerGetStudentClass'
import * as apiStudentClass from '../../../apis/lecturerStudentClass';
//mport * as api from '../../../apis/editGrade/editGrade';
//import * as toastify from '../../../commons/toastify'
import * as actionCreateFeedback from '../../../actions/Feedback/index'

import Footer from '../../Header_Footer/footer_1'
var CryptoJS = require('crypto-js')
class DetailGrade extends Component {
	constructor(props){
		super(props);
		this.state = {
			course : null,
			Feedback : false,
			Name : "Feedback",
			OutLine_ID : "",
			Session_ID : "",
			id : '', 
			dd : true
		}
	}
	viewHistoryGrade = (record) =>{
		//ko cho show modal transaction
		const {actionLecturerHandleShowC} = this.props;
        const {actionLecturerShow} = actionLecturerHandleShowC
        actionLecturerShow({
            ViewHistoryGrade : false
		})
		//lay ve danh sach sinh vien cua lop do
		apiStudentClass
            .lecturerStudentClass({Session_ID : record.OutLine_Session_ID,})
            .then(res => {
				//console.log(res.data)

				const {actionStudentClassC} = this.props;
				const {actionGetLecturerStudentClassSuccess} = actionStudentClassC
				actionGetLecturerStudentClassSuccess(res.data)

				const {actionGetTransactionCreators} = this.props;
				const {actionGetTransaction} = actionGetTransactionCreators;
				actionGetTransaction({
					OutLine_ID : record.OutLine_ID
				})
            })
            .catch(error => {
                
            }
        )
		/*const {actionStudentClassC} = this.props;
		const {actionGetLecturerStudentClass} = actionStudentClassC
		actionGetLecturerStudentClass({
			Session_ID : record.OutLine_Session_ID,
		})*/
		//console.log(record)
		//goi api lay ve danh sach diem luon
		/*const {actionGetTransactionCreators} = this.props;
		const {actionGetTransaction} = actionGetTransactionCreators;
		actionGetTransaction({
			OutLine_ID : record.OutLine_ID
		})*/
	}
	onFeedback = (record, index) =>{
		//console.log(record)
		if(this.state.Feedback === false){
			this.setState({
				Feedback : true,
				Name : "Send",
				OutLine_ID : record.OutLine_ID,
				Session_ID : record.OutLine_Session_ID,
				id : index
			})
		}

	}
	onCancel = (record, index) =>{
		this.setState({
			Feedback : false,
			Name : "Feedback",
			id : ""

		})
	}
	setSth = (record, index) =>{
		this.setState({
			OutLine_ID : record.OutLine_ID,
				Session_ID : record.OutLine_Session_ID,
			dd : false,
			id : index
		})
			

		
	}
	onSubmit = (event) =>{
		event.preventDefault();
		//goi api tao request cua studentc
		const {actionCreateFeedbackC}= this.props;
		const {createFeedback} = actionCreateFeedbackC;
		var date = new Date()
		
		const params = {
			Session_ID : this.state.Session_ID,
			OutLine_ID : this.state.OutLine_ID,
			//Type : sessionStorage.getItem('id'),
			Type : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			DateTime: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
			Reason : document.getElementById(`id${this.state.id}`).value
		}
		//console.log(this.state.id)
		console.log(params)
		
		createFeedback(params)

		
			this.setState({
				Feedback : false,
				Name : "Feedback",
				id : ""
			})
		

	}
	renderGrade = (outline, grade) =>{	
		let diem = grade.diem;
		let sum = 0;
		let percent;
		let xhtml = null;
		if(diem !== undefined){
		xhtml = outline.map((record, index)=>{
			percent = diem ? diem[index] * record.OutLine_Percent / 10 : 0;
			sum = sum + percent
			return(
				<tr key={index}>
					<td>{index + 1}</td>
					<td onClick={()=>this.viewHistoryGrade(record)} data-toggle="modal" data-target="#myModalTransaction">
						<a role="button">{record.OutLine_Name}</a>
					</td>
					<td>
						{diem ? diem[index] : ""}&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td>
					

						{ this.state.id !== index && diem[index] !== ''? <button type="button" onClick={()=>this.setSth(record, index)} className="btn btn-default">Feedback</button> : ""}
				
						{this.state.id === index ?
						<form onSubmit={this.onSubmit}>
							<textarea placeholder="Please provide your feedback" id={`id${index}`} className="form-control" rows="2" required="required"></textarea>
							<button type="sumbit" className="btn btn-default">{this.state.Name}</button>
							<button onClick={()=>this.onCancel(record, index)}type="sumbit" className="btn btn-default">Cancel</button>
						</form>
					
							: ""}
						
					
					</td>
					<td>{diem ? (diem[index] * record.OutLine_Percent / 10 !==0 ? `${diem[index] * record.OutLine_Percent / 10}%` : "") :"" }</td>
					<td>{record.OutLine_Percent}%</td>
				</tr>
			)
		})
		xhtml.push(
			<tr key="final">
				<td></td>
				<td></td>
				<td></td>
				<td>Sum</td>
				<td>{sum}%</td>
				<td></td>
			</tr>
		)
		xhtml.push(
			<tr key="note">
				<td colSpan="2">
					<p className="note">Click on the coursework title to view the history of grade</p>
				</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		)}
		return xhtml;
	} 
	render() {
		return (
			<div>
				{
					this.props.showDetailGrade === false
					? ""
					: 	
						<div className="panel panel-default">
							<div className="panel-heading"><h4 className="titlex">{this.props.lecturerHandleShow.Course.Course_Name}</h4></div>
							<div className="table-responsive table2">
							
								<table className="table table-bordered table-hover" >
									<thead>
										<tr>
											<th>No</th>
											<th>
												CourseWork Title
											</th>
											<th>Grade</th>
											<th>Feedback</th>
											<th>Grade %</th>
											<th>Max Grade %</th>
										</tr>
									</thead>
									<tbody>
										{this.renderGrade(this.props.outline, this.props.studentGradeBlockchain)}
										
									</tbody>
								</table>
								
							</div>
						
						</div>		
				}
						
			</div>	
		);
	}
}
const mapStateToProps = state => {
    return{
		showDetailGrade : state.studentIsShowDetailGrade,
		lecturerHandleShow : state.lecturerHandleShow,
		studentGradeBlockchain : state.studentGradeBlockchain
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionGetTransactionCreators : bindActionCreators(actionGetTransaction, dispatch),
		actionLecturerHandleShowC : bindActionCreators(actionLecturerHandleShow, dispatch),
		actionStudentClassC : bindActionCreators(actionStudentClass, dispatch),
		actionCreateFeedbackC : bindActionCreators(actionCreateFeedback, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailGrade);
