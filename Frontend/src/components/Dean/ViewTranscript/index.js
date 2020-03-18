/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './styles.css'
import DeanMenu from '../Menu';
import ListStudent from './ListStudent'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionDeanKhoa from '../../../actions/DeanViewTranscript/deanKhoa';
import * as actionDeanClass from '../../../actions/DeanViewTranscript/deanClass';
import * as actionDeanHandleShow from '../../../actions/DeanViewTranscript/deanHandleShow';
import * as actionDeanStudentClass from '../../../actions/DeanViewTranscript/deanStudentClass'
import Footer from '../../Header_Footer/footer'
var CryptoJS  = require('crypto-js')
class DeanViewTranscript extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderAgain: false
		}
	}

	componentDidMount() {
		const { actionDeanKhoaCreators } = this.props;
		const { actionGetDeanKhoa } = actionDeanKhoaCreators;
		actionGetDeanKhoa({
		//	Dean_ID: sessionStorage.getItem('id')
		Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
		})
	}

	renderKhoa = (khoa) => {
		let xhtml = null;
		if (khoa.length > 0) {
			xhtml = khoa.map((record, index) => {
				return (
					<li className="item_drop_down" onClick={() => this.takeClass(record)} key={index}>
						<a className="dropdown-item">{record.Class_Course}</a>
					</li>
				)
			})
		}
		return xhtml;
	}

	takeClass = (record) => {
		const { actionDeanClassCreators, actionDeanHandleShowCreators } = this.props;
		const { actionGetDeanClass } = actionDeanClassCreators;
		actionGetDeanClass({
			//Dean_ID: sessionStorage.getItem('id'),
			Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			Khoa: record.Class_Course
		})

		//thiet lap title
		const { actionDeanHandleShow } = actionDeanHandleShowCreators;
		actionDeanHandleShow({
			showTranscript: false,
			titleKhoa: record.Class_Course,
			titleClass: 'Choose Class Name',
		})

	}

	renderClass = (data) => {
		let xhtm = null;
		if (data.length > 0) {
			xhtm = data.map((record, index) => {
				return (
					<li onClick={() => this.renderListStudent(record)} className="item_drop_down" key={index}>
						<a className="dropdown-item">{record.Class_Name}</a>
					</li>
				)
			})
		}
		else
			xhtm = <li>Please choose the course first</li>
		return xhtm;
	}

	renderListStudent = data => {
		//set title deanclass
		//console.log("Chay")
		const { actionDeanHandleShowCreators } = this.props;
		const { actionDeanHandleShow } = actionDeanHandleShowCreators;
		actionDeanHandleShow({
			showTranscript: false,
			titleClass: data.Class_Name,
		})
		//lam cho component render lai de hien thi title drop down dean class
		this.setState({
			renderAgain: !this.state.renderAgain
		})

		//render ra list student 
		const { actionDeanStudentClassCreators } = this.props;
		const { actionGetDeanStudentClass } = actionDeanStudentClassCreators;
		actionGetDeanStudentClass({
			Class: data.Class_ID
		})
	}

	render() {
		return (
			<div className="">
				<DeanMenu />
				<div className="content container">
					<div className="content1 content2">
						<div className="dropdown drop1">
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								{this.props.deanHandleShow.titleKhoa}&nbsp;
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu chinhxyz" aria-labelledby="dropdownMenu1">
								{this.renderKhoa(this.props.deanKhoa)}
							</ul>
						</div><br />
						{/*render danh sach cac lop theo khoa*/}
						<div className="dropdown drop2">
							<button className="btn btn-default dropdown-toggle chinhsua" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{this.props.deanHandleShow.titleClass}&nbsp;
								<span className="caret"></span>
							</button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								{this.renderClass(this.props.deanClass)}
							</div>
						</div><br />
						
					</div>
				</div>
				{this.props.deanHandleShow.titleKhoa !== 'Choose Course' && this.props.deanHandleShow.titleClass !== 'Choose Class Name'
							? <div><ListStudent /></div>
							: ""
						}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		deanHandleShow: state.deanHandleShow,
		deanKhoa: state.deanKhoa,
		deanClass: state.deanClass,
		deanStudentClass: state.deanStudentClass
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionDeanKhoaCreators: bindActionCreators(actionDeanKhoa, dispatch),
		actionDeanClassCreators: bindActionCreators(actionDeanClass, dispatch),
		actionDeanHandleShowCreators: bindActionCreators(actionDeanHandleShow, dispatch),
		actionDeanStudentClassCreators: bindActionCreators(actionDeanStudentClass, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeanViewTranscript);
