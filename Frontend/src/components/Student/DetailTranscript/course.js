import React, { Component } from 'react';
import './course.css';
import DetailGrade from './detailGrade';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionStudentDetailGrrade from '../../../actions/studentDetailGrade';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import Footer from '../../Header_Footer/footer_1'

import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow';
var CryptoJS = require('crypto-js')
class Course extends Component {
	constructor(props){
		super(props);
		this.state = {
			course : null,
		}
	}

	renderViewGrade = (course) =>{
		const param = {
			DetailGrade : {
				Session_ID : course.Session_ID
			},
			Blockchain : {
				/*Year : this.props.titleDropdown.Year,
				Session : this.props.titleDropdown.Session,
				ID : course.Session_ID,
				Course : course.Course_ID,
				StudentID : sessionStorage.getItem('id'),*/
				Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
				PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
				Class : this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${course.Session_ID}-${course.Course_ID}`),
				//Student_ID : sessionStorage.getItem('id'),
				Student_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8)
				//Class : "MGM"
			}
		}
		const {actionStudentDetailGradeCreators, actionShowDetailGradeCreator, actionLecturerHandleShowCreator} = this.props;
		const {actionGetStudentDetailGrade} = actionStudentDetailGradeCreators;
		const {actionShowDetailGrade} = actionShowDetailGradeCreator;
		const {actionLecturerShow} = actionLecturerHandleShowCreator;
		
		actionGetStudentDetailGrade(param);
		actionShowDetailGrade();

		actionLecturerShow({
			"Course" : course,
		});

		this.setState({
			course : course,
		})
	}
	ignoreSpaces(string) {
		var temp = "";
		string = '' + string;
		let splitstring = string.split(" ");
		for(let i = 0; i < splitstring.length; i++)
		temp += splitstring[i];
		return temp;
	}
	renderCourse = (courses) =>{
		let xhtml = null;
		if(courses.length > 0){
			xhtml = courses.map((course, index)=>{
				return(
					<tr key={index}>
						<td className="record">{course.Course_ID}</td>
						<td className="record">{course.Course_Name}</td>
						<td className="record">{course.Session_Type}</td>
						<td className="record">{course.Lecturer_Name}</td>
						<td className="btn-view record">
							<button onClick={()=>this.renderViewGrade(course)}type="button" className="btn btn-default">
								<i className="glyphicon glyphicon-search"></i>&nbsp;
								View
							</button>
						</td>
					</tr>
				)
			})
		}
		return xhtml;
	}

	render() {
		return (
			<div>
				<div className="panel panel-danger panel-course">
					<div className="panel-body">
						{(this.props.titleDropdown.titleDropdown === "-- Select school year and semester --") 
							? <p id="test02">Choose school year and semester above...</p> 
							: (this.props.course.length === 0) 
							? <b>No Class</b> 
							:
								<table className="table table-bordered table-hover table-chinh">
									<thead className="table-title">
										<tr>
											<th>Class</th>
											<th>Course Name</th>
											<th>Type</th>
											<th>Lecturer</th>
											<th>View Grade</th>
										</tr>
									</thead>
									<tbody>
										{this.renderCourse(this.props.course)}
									</tbody>
								</table>
							}	
					</div>
				</div>		
				<DetailGrade course={this.state.course} outline={this.props.detailGrade} />
			
			</div>	
		);
	}
}
const mapStateToProps = state => {
    return{
		detailGrade : state.studentDetailGrade,
		course : state.studentCourse,
		studentSchoolYear : state.studentSchoolYear,
		titleDropdown : state.titleDropdown
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionStudentDetailGradeCreators : bindActionCreators(actionStudentDetailGrrade, dispatch) ,
		actionShowDetailGradeCreator : bindActionCreators(actionShowDetailGrade, dispatch),
		actionLecturerHandleShowCreator : bindActionCreators(actionLecturerHandleShow, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
