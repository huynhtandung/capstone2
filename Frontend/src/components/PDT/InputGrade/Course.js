import React, { Component } from 'react';
import InputGrade from './InputGrade';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionPDTStudentClass from '../../../actions/PDTInputGrade/pdtStudentClass'
import * as actionPDTHandleShow from '../../../actions/PDTInputGrade/pdtHandleShow'
import ViewClassGrade  from '../../Lecturer/InputGrade/viewClassGrade'
import * as actionLecturerClassGrade from '../../../actions/lecturerClassGrade';


class Course extends Component {
	constructor(props){
		super(props);
		this.state = {
			renderAgain : false
		}
	}
	ignoreSpaces(string) {
		var temp = "";
		string = '' + string;
		let splitstring = string.split(" ");
		for(let i = 0; i < splitstring.length; i++)
		temp += splitstring[i];
		return temp;
    }
	renderStudentClass = (course) =>{
		
		//console.log(course)
		const {actionPDTStudentClassCreators} = this.props;
		const {actionGetPDTStudentClass} = actionPDTStudentClassCreators;
		actionGetPDTStudentClass({
			Session_ID : course.Session_ID,
			Class : this.ignoreSpaces(`${this.props.pdtHandleShow.Year}-${this.props.pdtHandleShow.Semester}-${course.Session_ID}-${course.Course_ID}`),
		})
		//console.log(this.ignoreSpaces(`${this.props.pdtHandleShow.Year}-${this.props.pdtHandleShow.Semester}-${this.props.pdtHandleShow.Course.Session_ID}-${this.props.pdtHandleShow.Course.Course_ID}`))
		//set show student class
		const {actionPDTHandleShowCreators} = this.props;
		const {actionDeanHandleShow} =  actionPDTHandleShowCreators;
		actionDeanHandleShow({
			showStudentClass : true,
			Course : course,
			ViewClassGrade : false
		})

		//render lai component
		this.setState({
			renderAgain : !this.state.renderAgain
		})
	}

	ViewGrade = (course)=>{
		const {actionLecturerClassGradeCreators, actionPDTHandleShowCreators} = this.props;
		
		const {actionDeanHandleShow} =  actionPDTHandleShowCreators;
		const {actionGetLecturerClassGrade} = actionLecturerClassGradeCreators;

		actionDeanHandleShow({
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
				Class : this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.pdtHandleShow.Course.Session_ID}-${this.props.pdtHandleShow.Course.Course_ID}`),
			}
		})

		//console.log(this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`))
		this.setState({
			ViewClassGrade : true
		})
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
						<td className="record">{course.Course_Number_Of_Learning_Unit}</td>
						<td className="btn-view record">
							<button onClick={()=>this.renderStudentClass(course)}type="button" className="btn btn-default">
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
		if(xhtml === null)
			xhtml = (
				<tr>
					<td colSpan="5">No data</td>
				</tr>
			)
		return xhtml;
	}

	render() {
		return (
			<div className="thelastttt">
				<div className="panel panel-danger panel-course">
					<div className="panel-body">
                        <table className="table table-bordered table-hover">
                            <thead className="table-title">
                                <tr>
                                    <th>Class</th>
                                    <th>Course Name</th>
                                    <th>Type</th>
                                    <th>Creadits</th>
                                    <th>View Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCourse(this.props.course)}
                            </tbody>
                        </table>			
					</div>
				</div>		
				{/*hien thi danh sach sinh vien de nhap diem */}
				{/*this.props.pdtHandleShow.showStudentClass === true
					?<InputGrade />
					: ""
				*/}
				{this.props.pdtHandleShow.ViewClassGrade === true 
					?<ViewClassGrade />
					: <InputGrade />
				}
				
			</div>	
		);
	}
}
const mapStateToProps = state => {
    return{
		course : state.studentCourse,
		pdtHandleShow : state.pdtHandleShow,

		studentClass : state.lecturerStudentClass,
        outline : state.lecturerDetailCourse,
        titleDropdown : state.titleDropdown,
        isShow : state.pdtHandleShow.showStudentClass
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionPDTStudentClassCreators : bindActionCreators(actionPDTStudentClass, dispatch),
		actionPDTHandleShowCreators : bindActionCreators(actionPDTHandleShow, dispatch),
		actionLecturerClassGradeCreators : bindActionCreators(actionLecturerClassGrade, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
