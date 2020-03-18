/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {connect} from 'react-redux';


import {bindActionCreators} from 'redux';
import * as actionGetTransaction from '../../../actions/Transaction/transaction'
import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow'

class ViewClassGrade extends Component {
	viewHistoryGrade = (record) =>{
		//ko cho show modal transaction
		const {actionLecturerHandleShowC} = this.props;
        const {actionLecturerShow} = actionLecturerHandleShowC
        actionLecturerShow({
            ViewHistoryGrade : false
        })
		//console.log(record)
		//goi api lay ve danh sach diem luon
		const {actionGetTransactionCreators} = this.props;
		const {actionGetTransaction} = actionGetTransactionCreators;
		actionGetTransaction({
			OutLine_ID : record.OutLine_ID
		})
	}
	renderTypeGrade = (course) =>{
		let xhtml = null;
		if(course.length > 0){
			xhtml = course.map((record, index)=>{
				return(
					<th key={index} onClick={()=>this.viewHistoryGrade(record)} data-toggle="modal" data-target="#myModalTransaction">
						<a role="button">{record.OutLine_Name}</a>
					</th>
				)
			})
		}
		return xhtml;
	}
	renderStudentClass  = (course, students) =>{
		let grade = this.props.lecturerClassGrade.bangdiem;
		let xhtml = null;
		if(course.length >0){
			xhtml = students.map((student, index)=>{
				return(
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{student.JS_Student_ID}</td>
						<td>{student.Student_Name}</td>
						{
							course.map((record, i)=>{
								return(
									<td key={i * -1}>
										{grade[i][index]}
									</td>
								)
							})
						}
						
					</tr>
				)
			})
			xhtml.push(
				<tr key="note">
					<td colSpan="3"><p className="note">Click on coursework title to view the history of the grade</p></td>
				{
					course.map((record, i) => {
						return (
							<td key={i * -1}>
							</td>
						)
					})
				}
				</tr>
			)
		}
		return xhtml;
	}
	render() {
		return (
			<div>	
				{this.props.lecturerClassGrade !== '' 
				?
					<div className="panel panel-default">
						<div className="panel-heading">
						<h4 className="titlex">{this.props.lecturerHandleShow.Course.Course_Name}</h4>
						</div>
							<div className="table-responsive table2">
							<table className="table table-bordered table-hover">
								<thead>
									<tr>
										<th>No</th>
										<th>Student ID</th>
										<th>Student Name</th>
										{this.renderTypeGrade(this.props.lecturerDetailCourse)}
									</tr>
								</thead>
								<tbody>
									{this.renderStudentClass(this.props.lecturerDetailCourse, this.props.studentClass)}
								</tbody>
							</table>
							</div>
					</div>	
				: 	""
				}
					
			</div>	
		);
	}
}


const mapStateToProps = state => {
    return{
		lecturerDetailCourse : state.lecturerDetailCourse,
		studentClass : state.lecturerStudentClass,
		lecturerHandleShow : state.lecturerHandleShow,
		lecturerClassGrade : state.lecturerClassGrade

    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionGetTransactionCreators : bindActionCreators(actionGetTransaction, dispatch),
		actionLecturerHandleShowC : bindActionCreators(actionLecturerHandleShow, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewClassGrade);
