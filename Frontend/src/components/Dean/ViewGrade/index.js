import React, { Component } from 'react';
import DeanMenu from '../Menu';
import '../../Css/Content.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionDeanCourse from '../../../actions/deanCourse';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import * as actionDeanSchoolYear from '../../../actions/deanGetSchoolYear';
import * as actionTitleDropdown from '../../../actions/titleDropdown';
import * as actionLecturerHandleShow from '../../../actions/lecturerHandleShow';
import Course from './course';
import Modal from './../../Modal/transaction'
import Footer from '../../Header_Footer/footer';
var CryptoJS = require('crypto-js')
class DeanViewGrade extends Component {

	constructor(props) {
		super(props);
		this.state = {
			schoolYear: [],
			renderAgain: false
		}
	}

	componentDidMount() {
		const { actionDeanSchoolYearCreators } = this.props;
		const { actionGetDeanSchoolYear } = actionDeanSchoolYearCreators;

		actionGetDeanSchoolYear({
			//"Dean_ID": sessionStorage.getItem('id')
			Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
		})

		this.setState({
			renderAgain: !this.state.renderAgain
		})
	}
	SessionI = (year) => {
		const data = {
			Year: year,
			Session: "I"
		};
		const params = {
			//"Dean_ID": sessionStorage.getItem('id'),
			Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year": year,
			"Session_Semester": "1"
		}
		const { actionDeanCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators } = this.props;
		const { actionGetDeanCourse } = actionDeanCourseCreators;//lay course
		const { actionNotShowDetailGrade } = actionShowDetailGradeCreators;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetDeanCourse(params);
		actionNotShowDetailGrade();
	}

	SessionII = (year) => {
		const data = {
			Year: year,
			Session: "II"
		};
		const params = {
			//"Dean_ID": sessionStorage.getItem('id'),
			Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year": year,
			"Session_Semester": "2"
		}
		const { actionDeanCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators } = this.props;
		const { actionGetDeanCourse } = actionDeanCourseCreators;
		const { actionNotShowDetailGrade } = actionShowDetailGradeCreators;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetDeanCourse(params);
		actionNotShowDetailGrade();
	}

	SessionSummer = (year) => {
		const data = {
			Year: year,
			Session: "Summer"
		};
		const params = {
		//	"Dean_ID": sessionStorage.getItem('id'),
		Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			"Session_Year": year,
			"Session_Semester": "0"
		}
		const { actionDeanCourseCreators, actionShowDetailGradeCreators, actionTitleDropdownCreators } = this.props;
		const { actionGetDeanCourse } = actionDeanCourseCreators;
		const { actionNotShowDetailGrade } = actionShowDetailGradeCreators;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;

		actionHadChoosenDropdown(data)
		actionGetDeanCourse(params);
		actionNotShowDetailGrade();
	}

	renderSchoolYear = (listYear) => {
		let xhtml = null;
		if (listYear.length > 0) {
			xhtml = listYear.map((year, index) => {
				return (
					<div key={index}>
						<li className="dropdown-header">{year}</li>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={() => this.SessionI(year)} type="button" className="btn btn-primary">Session I</button>
							</li>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={() => this.SessionII(year)} type="button" className="btn btn-primary">Session II</button>
							</li>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<li className="school-year">
								<button onClick={() => this.SessionSummer(year)} type="button" className="btn btn-primary">Session Semester</button>
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
	setSchoolYear = () => {

		const { actionLecturerHandleShowCreator } = this.props;
		const { actionLecturerShow } = actionLecturerHandleShowCreator;
		actionLecturerShow({
			"ViewClassGrade": false,
		})

		this.setState({
			schoolYear: this.props.deanSchoolYear
		})

		/*if(year.length === 0)
			year = this.props.lecturerSchoolYear*/


	}
	render() {
		return (
			<div className="">
				<DeanMenu />

				<div className="content container">
					<Modal />
					<div className="content1">
						<div className="dropdown">
							<button onClick={() => this.setSchoolYear()} className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.titleDropdown.titleDropdown}
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderSchoolYear(this.props.deanSchoolYear)}
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
	return {
		deanSchoolYear: state.deanSchoolYear,
		titleDropdown: state.titleDropdown
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionDeanCourseCreators: bindActionCreators(actionDeanCourse, dispatch),
		actionShowDetailGradeCreators: bindActionCreators(actionShowDetailGrade, dispatch),
		actionDeanSchoolYearCreators: bindActionCreators(actionDeanSchoolYear, dispatch),
		actionTitleDropdownCreators: bindActionCreators(actionTitleDropdown, dispatch),
		actionLecturerHandleShowCreator: bindActionCreators(actionLecturerHandleShow, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeanViewGrade);
