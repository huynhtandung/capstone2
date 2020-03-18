import React, { Component } from 'react';
import Menu from '../Menu';
import './styles.css';
import '../../Css/Content.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionGetAllGrade from '../../../actions/studentGetAllGrade';
import Footer from '../../Header_Footer/footer'

var CryptoJS = require('crypto-js')
class StudentTranscript extends Component {
	
	componentDidMount(){
		const {actionGetAllGradeCreators} = this.props;
		const {actionStudentGetAllGrade} = actionGetAllGradeCreators;
		actionStudentGetAllGrade({
			//Student_ID : sessionStorage.getItem('id'),
			"Student_ID" : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
			Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
			PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
		})
	}
	renderAsYearSemester=(data, course, grade)=>{
		let xhtml = [];
		let sumGrade = 0;
		let sumCreadits = 0;
		xhtml.push(
			<tr key="year-semester" className="year_semester">
				<td colSpan="4">School Year {data.Year} - Session {data.Semester === 0 ? "Summer" : data.Semester}</td>
			</tr>
		)
		course.map((record, index)=>{
			if(record.Session_Year === data.Year && record.Session_Semester === data.Semester){
				if(grade[index]/10 !== 0) {
					sumGrade = sumGrade + ((grade[index]/10) * record.Course_Number_Of_Learning_Unit);
					sumCreadits = sumCreadits + record.Course_Number_Of_Learning_Unit;
					//globalGrade = globalGrade + ((grade[index]/10) * record.Course_Number_Of_Learning_Unit);
					//globalCreadits = globalCreadits + record.Course_Number_Of_Learning_Unit;
					
				}
				return xhtml.push(
					<tr key={index}>
						<td>{record.Course_Name}</td>
						<td>{record.Session_Type}</td>
						<td>{record.Course_Number_Of_Learning_Unit}</td>
						<td>{grade[index]/10 !== 0 ? grade[index]/10 : ""}</td>
					</tr>
				)
			}
			return null;
			
		})
		xhtml.push(
			<tr key="sumcreadit" className="sum">
				<td colSpan="2" className="textAlignRight">Sum of creadits</td>
				<td>{sumCreadits}</td>
				<td></td>
			</tr>
		)
		xhtml.push(
			<tr key="sumgrade" className="sum">
				<td colSpan="2" className="textAlignRight">Average grade</td>
				<td>{sumCreadits !== 0 ? Math.round((sumGrade/sumCreadits) * 100)/100 : ""}</td>
				<td></td>
			</tr>
		)
		return xhtml;
	}
	renderTranscript = (years, course, grade) =>{
		var globalGrade = 0;
		var globalCreadits = 0;
		
		let xhtml = [];
		let newYear = [];
		if(years.length >0){
			years.map((year, index)=>{
				return (
					newYear.push({
						Year : year,
						Semester : 1
					}),
					newYear.push({
						Year : year,
						Semester : 2
					}),
					newYear.push({
						Year : year,
						Semester : 0
					})
				)
			})
		}
		if(course.length > 0 && grade.length > 0){
			newYear.map((year, index)=>{
				return xhtml.push(this.renderAsYearSemester(year, course, grade))
			})
		}

		if(course.length > 0 && grade.length > 0){
			course.map((record, index)=>{
				if(grade[index]/10 !== 0) {
					globalGrade = globalGrade + ((grade[index]/10) * record.Course_Number_Of_Learning_Unit);
					globalCreadits = globalCreadits + record.Course_Number_Of_Learning_Unit;
				}
				return null;
			})
			
			xhtml.push(
				<tr key="credit" className="final">
					<td colSpan="2" className="textAlignRight">Final Creadits</td>
					<td>{globalCreadits}</td>
					<td></td>
				</tr>
			)
			xhtml.push(
				<tr key="grade" className="final">
					<td colSpan="2" className="textAlignRight">Final average grade</td>
					<td>{globalCreadits !== 0 ? Math.round((globalGrade/globalCreadits) * 100)/100 : ""}</td>
					<td></td>
				</tr>
			)
		}
		return xhtml;
	}
	render() {
		return (
			<div className="">
				<Menu />
				{console.log(this.props)}
				<div className="content container">
					<div className="panel panel-primary">
						<div className="panel-heading"><h3 className="titlepp"><span>Student ID: </span>{CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8)}</h3></div>
							<div className="table-responsive">
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Subject</th>
											<th>Type</th>
											<th>Creadits</th>
											<th>Grade</th>
										</tr>
									</thead>
									<tbody>
										{this.renderTranscript(this.props.studentSchoolYear,this.props.studentGetAllClass, this.props.studentGetAllGrade)}
									</tbody>
								</table>
							</div>
					</div>
					
				</div>
				
			</div>
		);
	}
}
const mapStateToProps = state => {
    return{
		studentGetAllGrade : state.studentGetAllGrade,
		studentGetAllClass : state.studentGetAllClass,
		studentSchoolYear : state.studentSchoolYear
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionGetAllGradeCreators : bindActionCreators(actionGetAllGrade, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentTranscript);
