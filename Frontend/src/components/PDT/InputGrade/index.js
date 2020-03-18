/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PDTMenu from '../Menu';
import '../../Css/Content.css';
import Course from './Course';
//import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionTitleDropdown from '../../../actions/titleDropdown';
import './detailCourse.css';
/*import * as actionStudentCourse from '../../../actions/studentCourse';
import * as actionShowDetailGrade from '../../../actions/studentIsShowDetailGrade';
import * as actionStudentSchoolYear from '../../../actions/studentGetSchoolYear';

import * as actionTitleDropdown from '../../../actions/titleDropdown';*/

//import Course from './course';
import * as actionPDTSchoolYear from '../../../actions/PDTInputGrade/pdtSchoolYear';
import * as actionPDTHandleShow from '../../../actions/PDTInputGrade/pdtHandleShow'
import * as actionDepartment from '../../../actions/PDTInputGrade/pdtDepartment';
import * as actionPDTCourse from '../../../actions/PDTInputGrade/pdtCourse';
import Modal from './../../Modal/transaction'
import Footer from '../../Header_Footer/footer'


class PDTInputGrade extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderAgain: false
		}
	}

	componentDidMount() {
		const { actionPDTSchoolYearCreators } = this.props;
		const { actionGetPDTSchoolYear } = actionPDTSchoolYearCreators;
		actionGetPDTSchoolYear()
		//lay ds cac khoa

	}

	SessionI = (year) => {
		const data = {
			Year: year,
			Session: "I"
		};
		const { actionTitleDropdownCreators } = this.props;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;
		actionHadChoosenDropdown(data)

		actionHadChoosenDropdown(data)
		const { actionPDTHandleShowCreators } = this.props;
		const { actionDeanHandleShow } = actionPDTHandleShowCreators;
		actionDeanHandleShow({
			Year: year,
			Semester: 'I',
			titleSchoolYear: 'School Year ' + year + ' Session I ',
			titleDepartment: 'Choose department ',
			ViewClassGrade: false
		})
		//lay ds cac khoa, ko the dua vo compoentdidmount - giai quyet tam thoi
		const { actionDepartmentCreators } = this.props;
		const { actionGetPDTDepartment } = actionDepartmentCreators;
		actionGetPDTDepartment()
		//render lai component
		this.setState({
			renderAgain: !this.state.renderAgain
		})
	}

	SessionII = (year) => {
		const data = {
			Year: year,
			Session: "II"
		};
		const { actionTitleDropdownCreators } = this.props;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;
		actionHadChoosenDropdown(data)

		const { actionPDTHandleShowCreators } = this.props;
		const { actionDeanHandleShow } = actionPDTHandleShowCreators;
		actionDeanHandleShow({
			Year: year,
			Semester: 'II',
			titleSchoolYear: 'School Year ' + year + ' Session II ',
			titleDepartment: 'Choose department ',
			ViewClassGrade: false
		})
		//lay ds cac khoa, ko the dua vo compoentdidmount - giai quyet tam thoi
		const { actionDepartmentCreators } = this.props;
		const { actionGetPDTDepartment } = actionDepartmentCreators;
		actionGetPDTDepartment()
		//render lai component
		this.setState({
			renderAgain: !this.state.renderAgain
		})
	}

	SessionSummer = (year) => {
		const data = {
			Year: year,
			Session: "Summer"
		};
		const { actionTitleDropdownCreators } = this.props;
		const { actionHadChoosenDropdown } = actionTitleDropdownCreators;
		actionHadChoosenDropdown(data)

		const { actionPDTHandleShowCreators } = this.props;
		const { actionDeanHandleShow } = actionPDTHandleShowCreators;
		actionDeanHandleShow({
			Year: year,
			Semester: 'Summer',
			titleSchoolYear: 'School Year ' + year + ' Session Summer ',
			titleDepartment: 'Choose department ',
			ViewClassGrade: false
		})
		//lay ds cac khoa, ko the dua vo compoentdidmount - giai quyet tam thoi
		const { actionDepartmentCreators } = this.props;
		const { actionGetPDTDepartment } = actionDepartmentCreators;
		actionGetPDTDepartment()
		//render lai component
		this.setState({
			renderAgain: !this.state.renderAgain
		})
	}

	renderSchoolYear = (listYear) => {
		let xhtml = null;
		if (listYear.length > 0) {
			xhtml = listYear.map((year, index) => {
				return (
					<div key={index}>
						<li className="dropdown-header"><h5>{year}</h5></li>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={() => this.SessionI(year)} type="button" className="btn btn-primary">Semester I</button>
							</li>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<li className="school-year">
								<button onClick={() => this.SessionII(year)} type="button" className="btn btn-primary">Semester II</button>
							</li>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<li className="school-year">
								<button onClick={() => this.SessionSummer(year)} type="button" className="btn btn-primary">Semester Summer</button>
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

	renderDepartment = (departments) => {
		let xhtml = null;
		if (departments.length > 0) {
			xhtml = departments.map((dep, index) => {
				return (
					<li onClick={() => this.renderCourse(dep)} className="item_drop_down" key={index}>
						<a className="dropdown-item">{dep.Dep_Name}</a>
					</li>
				)
			})
		}
		if (xhtml === null)
			xhtml = <li>
				<a className="dropdown-item">Choose the school year first</a>
			</li>
		return xhtml;
	}

	renderCourse = (dep) => {
		const { actionPDTHandleShowCreators } = this.props;
		const { actionDeanHandleShow } = actionPDTHandleShowCreators;
		actionDeanHandleShow({
			titleDepartment: 'Khoa ' + dep.Dep_Name + ' ',
			showStudentClass: false,
			ViewClassGrade: false
		})
		//render lai component
		this.setState({
			renderAgain: !this.state.renderAgain
		})
		//lay danh sach cac lop theo khoa
		const { actionPDTCourseCreators } = this.props;
		const { actionGetPDTCourse } = actionPDTCourseCreators;
		const params = {
			Department: dep.Dep_ID,
			Year: this.props.pdtHandleShow.Year,
			Semester: this.changerLetterSemester(this.props.pdtHandleShow.Semester)
		}
		actionGetPDTCourse(params)
	}

	changerLetterSemester = (i) => {
		if (i === 'I')
			return 1
		else if (i === 'II')
			return 2;
		else
			return 0;
	}

	render() {
		return (
			<div className="">
				<PDTMenu />

				<div className="content container">
					<Modal />
					<div className="content">
						<div className="dropdown km">
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.pdtHandleShow.titleSchoolYear}
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderSchoolYear(this.props.studentSchoolYear)}
							</ul>
						</div>

						{/*Danh sach cac khoa*/}
						<div className="dropdown ti km">
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.pdtHandleShow.titleDepartment}
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderDepartment(this.props.pdtDepartment)}
							</ul>
						</div><br />
						{/*Noi hien thi danh sach cach mon hoc*/}
						{(this.props.pdtHandleShow.titleSchoolYear !== 'Choose school year and semester '
							&& this.props.pdtHandleShow.titleDepartment !== 'Choose department ')
							? <Course />
							: ""
						}
					</div>
				</div>
						
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		studentSchoolYear: state.studentSchoolYear,
		pdtHandleShow: state.pdtHandleShow,
		pdtDepartment: state.pdtDepartment,
		studentCourse: state.studentCourse
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionPDTSchoolYearCreators: bindActionCreators(actionPDTSchoolYear, dispatch),
		actionPDTHandleShowCreators: bindActionCreators(actionPDTHandleShow, dispatch),
		actionDepartmentCreators: bindActionCreators(actionDepartment, dispatch),
		actionPDTCourseCreators: bindActionCreators(actionPDTCourse, dispatch),
		actionTitleDropdownCreators: bindActionCreators(actionTitleDropdown, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PDTInputGrade);
