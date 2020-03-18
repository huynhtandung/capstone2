import React, { Component } from 'react';

import DetailCourse from './detailCourse';
import ViewClassGrade from './viewClassGrade';
//import Test from './detailCourse';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionLecturerDetailCourse from '../../../actions/lecturerGetDetailCourse';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import * as actionStudentClass from '../../../actions/lecturerGetStudentClass';

import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow';
import * as actionLecturerClassGrade from '../../../actions/lecturerClassGrade';
import Modal from './../../Modal/transaction'

class Course extends Component {
	constructor(props){
		super(props);
		this.state = {
			course : null,
			ViewClassGrade : false
		}
	}

	renderViewGrade = (course) =>{
		const param = {
			Session_ID : course.Session_ID
		}
		const {actionLecturerDetailCourseCreators, actionShowDetailGradeCreator, actionLecturerHandleShowCreator} = this.props;
		const {actionGetLecturerDetailCourse} = actionLecturerDetailCourseCreators;
		const {actionShowDetailGrade} = actionShowDetailGradeCreator;
				const {actionLecturerShow} = actionLecturerHandleShowCreator;

		/*let check = false;
		if(course.Session_IsUploadStudent === true)
			check = true;*/
		actionGetLecturerDetailCourse(param);
		actionShowDetailGrade();
		
		actionLecturerShow({
			"Course" : course,
			"IsShow" : false,
			"ViewClassGrade" : false,
			"IsUploadStudent" : course.Session_IsUploadStudent,
			"IsUploadOutline" : course.Session_IsUploadOutline,

			//"finishUpload" : check
		});

		this.setState({
			course : course,
			ViewClassGrade : false
		})
	}
	ViewGrade = (course)=>{
		const {actionLecturerClassGradeCreators, actionLecturerHandleShowCreator} = this.props;
		
		const {actionLecturerShow} = actionLecturerHandleShowCreator;
		const {actionGetLecturerClassGrade} = actionLecturerClassGradeCreators;

		actionLecturerShow({
			"ViewClassGrade" : true,
			"Course" : course,
		})

		actionGetLecturerClassGrade({
			DetailCourse : {
				Session_ID : course.Session_ID
			},
			StudentClass : {
				Session_ID : course.Session_ID
			},
			GetClassGradeBC : {
				Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
				PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
				Class : this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`),
			}
		})

		//console.log(this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`))
		this.setState({
			ViewClassGrade : true
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
						<td className="btn-view record">
							<button onClick={()=>this.renderViewGrade(course)}type="button" className="btn btn-default">
								<i className="glyphicon glyphicon-pencil"></i>&nbsp;
								Input Grade
							</button>
							<button onClick={()=>this.ViewGrade(course)}type="button" className="btn btn-default">
								<i className="glyphicon glyphicon-search"></i>&nbsp;
								View Grade&nbsp;
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
				<Modal />
				{this.props.lecturerHandleShow.ViewClassGrade === true 
					?<ViewClassGrade />
					: <DetailCourse />
				}
			</div>	
		);
	}
}
const mapStateToProps = state => {
    return{
		lecturerDetailCourse : state.lecturerDetailCourse,
		course : state.lecturerCourse,
		titleDropdown : state.titleDropdown,
		lecturerHandleShow : state.lecturerHandleShow,
		showDetailGrade : state.studentIsShowDetailGrade,
		//course : state.lecturerCourse,
		studentClass : state.lecturerStudentClass,
		//nam hoc  hoc ky
		outline : state.lecturerDetailCourse,
		lecturerUploadGrade : state.lecturerUploadGrade
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionLecturerDetailCourseCreators : bindActionCreators(actionLecturerDetailCourse, dispatch) ,
		actionShowDetailGradeCreator : bindActionCreators(actionShowDetailGrade, dispatch),
		actionGetStudentClassCreator : bindActionCreators(actionStudentClass, dispatch),
		actionLecturerHandleShowCreator : bindActionCreators(actionLecturerHandleShow, dispatch),
				actionLecturerClassGradeCreators : bindActionCreators(actionLecturerClassGrade, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
