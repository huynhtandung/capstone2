import React, { Component } from 'react';
import Menu from '../Menu';
import '../../Css/Content.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionLecturerCourse from '../../../actions/lecturerCourse';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import * as actionLecturerSchoolYear from '../../../actions/lecturerGetSchoolYear';

import * as actionTitleDropdown from '../../../actions/titleDropdown';

import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow';

import Course from './course';

import Footer from '../../Header_Footer/footer'

/*var year = sessionStorage.getItem("year");

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



var year = [];
var CryptoJS = require('crypto-js')
class InputGrade extends Component {

	constructor(props){
		super(props);
		this.state = {
			schoolYear : []
		}
	}

	componentDidMount(){
		const {actionStudentSchoolYearCreator} = this.props;
		const {actionGetLecturerSchoolYear} = actionStudentSchoolYearCreator;

		actionGetLecturerSchoolYear({
		//	"Lecturer_ID" : sessionStorage.getItem('id')
			Lecturer_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
		})
	}
	SessionI = (year) => {
		const data = {
			Year : year,
			Session : "I"
		};
		const params = {
			//"Lecturer_ID" : sessionStorage.getItem('id'),
			Lecturer_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "1"
		}
		const {actionLecturerCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetLecturerCourse} = actionLecturerCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetLecturerCourse(params);
		actionNotShowDetailGrade();
	}

	SessionII = (year) => {
		const data = {
			Year : year,
			Session : "II"
		};
		const params = {
			//"Lecturer_ID" : sessionStorage.getItem('id'),
			Lecturer_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "2"
		}
		const {actionLecturerCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetLecturerCourse} = actionLecturerCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetLecturerCourse(params);
		actionNotShowDetailGrade();
	}

	SessionSummer = (year) => {
		const data = {
			Year : year,
			Session : "Summer"
		};
		const params = {
		//	"Lecturer_ID" : sessionStorage.getItem('id'),
		Lecturer_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year" : year,
			"Session_Semester" : "0"
		}
		const {actionLecturerCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators} = this.props;
		const {actionGetLecturerCourse} = actionLecturerCourseCreators;
		const {actionNotShowDetailGrade} = actionShowDetailGradeCreators;
		const {actionHadChoosenDropdown} = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetLecturerCourse(params);
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
								<button onClick={()=>this.SessionI(year)} type="button" className="btn btn-primary">Semester I</button>
							</li>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={()=>this.SessionII(year)} type="button" className="btn btn-primary">Semester II</button>
							</li>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<li className="school-year">
								<button onClick={()=>this.SessionSummer(year)} type="button" className="btn btn-primary">Semester Summer</button>
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
	setSchoolYear = ()=>{
		
		const {actionLecturerHandleShowCreator} = this.props;
		const {actionLecturerShow} = actionLecturerHandleShowCreator;
		actionLecturerShow({
			"ViewClassGrade" : false,
		})

		this.setState({
			schoolYear : this.props.lecturerSchoolYear
		})

		if(year.length === 0)
			year = this.props.lecturerSchoolYear
		

	}
	render() {
		return (
			<div className="">
				<Menu />
				<div className="content container">
					<div className="content1">
						<div className="dropdown">
							<button onClick={()=>this.setSchoolYear()} className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.titleDropdown.titleDropdown} 
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderSchoolYear(this.props.lecturerSchoolYear)}							
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
		lecturerSchoolYear : state.lecturerSchoolYear,
		titleDropdown : state.titleDropdown
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionLecturerCourseCreators : bindActionCreators(actionLecturerCourse, dispatch),  
		actionShowDetailGradeCreators : bindActionCreators(actionShowDetailGrade, dispatch),
		actionStudentSchoolYearCreator : bindActionCreators(actionLecturerSchoolYear, dispatch),
		actionTitleDropdownCreators : bindActionCreators(actionTitleDropdown, dispatch),
		actionLecturerHandleShowCreator : bindActionCreators(actionLecturerHandleShow, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputGrade);
