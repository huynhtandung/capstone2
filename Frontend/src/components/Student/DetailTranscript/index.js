import React, { Component } from 'react';
import Menu from '../Menu';
import '../../Css/Content.css';
import './styles.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionStudentCourse from '../../../actions/studentCourse';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import * as actionStudentSchoolYear from '../../../actions/studentGetSchoolYear';

import * as actionTitleDropdown from '../../../actions/titleDropdown';

import Course from './course';
import Modal from '../../Modal/transaction'


/*var year = sessionStorage.getItem("year");
Debug viec loi nam
if(year === 0)
	year = 2018
var date = new Date();
var currentyear = date.getFullYear();
var schoolYear = []

while(year <= currentyear+1){
	schoolYear.push(
		(+year+0) + "-" + (+year+1),
	)
	year ++ ;
}*/
var CryptoJS = require('crypto-js')

class StudentTranscript extends Component {

	constructor(props){
		super(props);
		this.state = {
			schoolYear : []
		}
	}

	componentDidMount(){
		const {actionStudentSchoolYearCreator} = this.props;
		const {actionGetStudentSchoolYear} = actionStudentSchoolYearCreator;
		actionGetStudentSchoolYear({
			//"Student_ID" : sessionStorage.getItem('id')
			"Student_ID" : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8)
		})
	}
	
	SessionI = (year) => {
		const data = {
			Year : year,
			Session : "I"
		};
		const params = {
			//"Student_ID" : sessionStorage.getItem('id'),
			"Student_ID" : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "1"
		}
		const {actionStudentCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetStudentCourse} = actionStudentCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetStudentCourse(params);
		actionNotShowDetailGrade();
	}

	SessionII = (year) => {
		const data = {
			Year : year,
			Session : "II"
		};
		const params = {
			//"Student_ID" : sessionStorage.getItem('id'),
			Student_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "2"
		}
		const {actionStudentCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetStudentCourse} = actionStudentCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetStudentCourse(params);
		actionNotShowDetailGrade();
	}

	SessionSummer = (year) => {
		const data = {
			Year : year,
			Session : "Summer"
		};
		const params = {
			//"Student_ID" : sessionStorage.getItem('id'),
			Student_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "0"
		}
		const {actionStudentCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetStudentCourse} = actionStudentCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetStudentCourse(params);
		actionNotShowDetailGrade();
	}

	renderSchoolYear = (listYear) =>{
		let xhtml = null;
		if(listYear.length > 0){
			xhtml = listYear.map((year, index) =>{	
				return(
					<div key={index}>
						<li className="dropdown-header">{year}</li>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={()=>this.SessionI(year)} type="button" className="btn btn-primary">Session I</button>
							</li>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={()=>this.SessionII(year)} type="button" className="btn btn-primary">Session II</button>
							</li>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<li className="school-year">
								<button onClick={()=>this.SessionSummer(year)} type="button" className="btn btn-primary">Session Semester</button>
							</li>
						</div>
						<br />
						<li role="separator" className="divider"></li>
					</div>
				)
			})
		}
		return xhtml;
	}
	Year = ()=>{
		this.setState({
			schoolYear : this.props.studentSchoolYear
		})
	}
	render() {
		return (
			<div className="">
				<Menu />
				<div className="content container">
					<Modal />
					<div className="content1">
						<div className="dropdown">
							<button onClick={()=>this.Year()} className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.titleDropdown.titleDropdown}
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderSchoolYear(this.props.studentSchoolYear)}							
							</ul>
						</div>
						<br />
						{/*Noi hien thi danh sach cach mon hoc*/}			
						<Course />
					</div>
				</div>
			
			</div>
		);
	}
}
const mapStateToProps = state => {
    return{
		studentSchoolYear : state.studentSchoolYear,
		titleDropdown : state.titleDropdown
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionStudentCourseCreators : bindActionCreators(actionStudentCourse, dispatch),  
		actionShowDetailGradeCreators : bindActionCreators(actionShowDetailGrade, dispatch),
		actionStudentSchoolYearCreator : bindActionCreators(actionStudentSchoolYear, dispatch),
		actionTitleDropdownCreators : bindActionCreators(actionTitleDropdown, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentTranscript);
