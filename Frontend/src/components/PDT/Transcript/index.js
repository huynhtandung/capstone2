/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import DeanMenu from '../Menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionPDTAllCourse from '../../../actions/PDTTranscript/pdtAllCourse';
import * as actionHandleShow from '../../../actions/PDTTranscript/pdtHandleShow';
import * as actionPDTAllDepartment from '../../../actions/PDTTranscript/pdtAllDepartment'
import * as actionPDTAllClass from '../../../actions/PDTTranscript/pdtAllClass'
import * as actionPDTAllStudentClass from '../../../actions/PDTTranscript/pdtAllStudentClass'
import Footer from '../../Header_Footer/footer'

import StudentClass from './StudentClass'

import './dean.css'

var style1 = {
	position: 'absolute',
	left: '176px',
}
var style2 = {
	position: 'absolute',
    left: '350px',
    top: '187px',
}
var style3 = {
	position: 'absolute',
    left: '560px',
    top: '187px'
}

var st = {
	backgroundColor : '#d1d1d1'
}


class PDTTranscript extends Component {
	constructor(props){
		super(props);
		this.state = {
			renderAgain : false
		}
	}
	componentDidMount(){
		const {actionPDTAllCourseCreators} = this.props;
		const {actionGetPDTAllCourse} = actionPDTAllCourseCreators;
		actionGetPDTAllCourse()
	}
	renderAllKhoa = (khoa) =>{
		let xhtml = null;
		if(khoa.length > 0){
			xhtml = khoa.map((record, index)=>{
				return(		
					<li onClick={()=>this.renderDepartment(record)} className="item_drop_down" key={index}>
						<a className="dropdown-item">{record.Class_Course}</a>
					</li>	
				)
			})
		}
		return xhtml;
	}
	renderDepartment = (data) =>{
		//set tittle drop down course
		const {actionHandleShowCreators} = this.props;
		const {actionPDTHandleShow} = actionHandleShowCreators;
		actionPDTHandleShow({
			titleCourse : "Course " + data.Class_Course + " ",
			titleDepartment : "Choose department ",
			Course : data.Class_Course,
			titleClass : 'Choose class ',
			showTranscript : false
		})
		//render ra danh sach cac khoa
		const {actionPDTAllDepartmentCreators} = this.props;
		const {actionGetPDTAllDepartment} = actionPDTAllDepartmentCreators;
		actionGetPDTAllDepartment()

		//render lai component
		this.setState({
			renderAgain : !this.state.renderAgain
		})
	}

	renderAllDepartment = (deps) =>{
		let xhtml = null;
		if(deps.length > 0){
			xhtml = deps.map((record, index)=>{
				return(		
					<li onClick={()=>this.renderClass(record)} className="item_drop_down" key={index}>
						<a className="dropdown-item">{record.Dep_Name}</a>
					</li>	
				)
			})
		}
		if(xhtml === null)
			xhtml = (
				<li>Choose the course first</li>
			)
		return xhtml;
	}

	renderClass = (data) =>{
		//set lai title dropdown department
		const {actionHandleShowCreators} = this.props;
		const {actionPDTHandleShow} = actionHandleShowCreators;
		actionPDTHandleShow({
			titleDepartment : data.Dep_Name + " ",
			Department : data.Dep_ID,
			titleClass : 'Choose class ',
			showTranscript : false
		})

		//render ra danh sach tat cac cac lop cua khoa do
		const {actionPDTAllClassCreators} = this.props;
		const {actionGetPDTAllClass} = actionPDTAllClassCreators;
		actionGetPDTAllClass({
			Course : this.props.pdtTranscriptHandleShow.Course,
			Department : this.props.pdtTranscriptHandleShow.Department
		})

		//render lai component
		this.setState({
			renderAgain : !this.state.renderAgain
		})
	}

	renderAllClass = (data) =>{
		let xhtml = null;
		if(data.length > 0){
			xhtml = data.map((record, index)=>{
				return(		
					<li onClick={()=>this.renderStudent(record)} className="item_drop_down" key={index}>
						<a className="dropdown-item">{record.Class_Name}</a>
					</li>	
				)
			})
		}
		if(xhtml === null)
			xhtml = (
				<li>No Class</li>
			)
		return xhtml;
	}

	renderStudent = (data) =>{
		const {actionHandleShowCreators} = this.props;
		const {actionPDTHandleShow} = actionHandleShowCreators;
		actionPDTHandleShow({
			titleClass : "Class " + data.Class_Name + " "
		})

		//lay ra danh sach tat cac cac sinh vien
		const {actionPDTAllStudentClassCreators} = this.props;
		const {actionGetPDTAllStudentClass} = actionPDTAllStudentClassCreators
		actionGetPDTAllStudentClass({
			Class_ID : data.Class_ID
		})
		//render lai component
		this.setState({
			renderAgain : !this.state.renderAgain
		})
	}
	
	render() {
		return (
			<div className="">
				<DeanMenu />
				<div className="content">
					<div className="container">
						{/*Hien thi danh sach cac khoa k222. k23*/}
						<div className="dropdown" style={style1}>
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.pdtTranscriptHandleShow.titleCourse}&nbsp;
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderAllKhoa(this.props.listKhoa)}							
							</ul>
						</div><br />
						{/*render danh sach cac khoa*/}
						<div className="dropdown" style={style2}>
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.pdtTranscriptHandleShow.titleDepartment}&nbsp;
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderAllDepartment(this.props.listDepartment)}							
							</ul>
						</div><br />
						{/*render danh sach cac lop theo khoa  vd lop TPM1 khoa K22*/}
						<div className="dropdown" style={style3}>
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.pdtTranscriptHandleShow.titleClass}&nbsp;
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								{this.renderAllClass(this.props.listClass)}							
							</ul>
						</div><br />
						
					</div>
				</div>
				{this.props.pdtTranscriptHandleShow.titleCourse !== 'Choose course '
						&& this.props.pdtTranscriptHandleShow.titleDepartment !== 'Choose department '
						&& this.props.pdtTranscriptHandleShow.titleClass !== 'Choose class '
							? <div><StudentClass /></div>
							: ""
						}
			</div>
		);
	}
}
const mapStateToProps = state => {
    return{
		listKhoa : state.deanKhoa,
		listDepartment : state.pdtDepartment,
		listClass : state.deanClass,
		pdtTranscriptHandleShow : state.pdtTranscriptHandleShow
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionPDTAllCourseCreators : bindActionCreators(actionPDTAllCourse, dispatch),
		actionHandleShowCreators : bindActionCreators(actionHandleShow, dispatch),
		actionPDTAllDepartmentCreators : bindActionCreators(actionPDTAllDepartment, dispatch),
		actionPDTAllClassCreators : bindActionCreators(actionPDTAllClass, dispatch),
		actionPDTAllStudentClassCreators : bindActionCreators(actionPDTAllStudentClass, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PDTTranscript);
