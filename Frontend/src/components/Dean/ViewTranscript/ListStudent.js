import React,{Component} from 'react';
import {connect}  from 'react-redux'
import Transcript from './Transcript'
import {bindActionCreators} from 'redux';

import * as actionDeanStudentCourse from '../../../actions/DeanViewTranscript/deanStudentCourse'
import * as actionDeanHandleShow from '../../../actions/DeanViewTranscript/deanHandleShow';
import Footer from '../../Header_Footer/footer'

class ListStudent extends Component {
	constructor(props){
		super(props);
		this.state = {
			renderAgain : false
		}
	}
	renderStudentClass = (data) =>{
		let xhtml = null;
		if(data.length > 0){
			xhtml = data.map((record, index)=>{
				return (
					<tr key={index}>
						<td>{index+1}</td>
						<td>{record.Student_ID}</td>
						<td>{record.Student_Name}</td>
						<td>{record.Student_Email}</td>
						<td>							
							<button onClick={()=>this.renderTranscript(record)} type="button" className="btn btn-warning">
								<i className="glyphicon glyphicon-zoom-in" />&nbsp;
								View
							</button>							
						</td>
					</tr>
				)
			})
		}else{
			xhtml = <tr>
				<td colSpan="5">
					No data
				</td>
			</tr>
		}
		return xhtml;
	}

	renderTranscript = data => {
		const {actionDeanStudentCourseCreators}  =this.props;
		const {actionGetStudentDeanCourse} = actionDeanStudentCourseCreators;
		actionGetStudentDeanCourse({
			Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
			PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
			Student_ID : data.Student_ID
		})
		
		const {actionDeanHandleShowCreators} = this.props;
		const {actionDeanHandleShow} = actionDeanHandleShowCreators;
		actionDeanHandleShow({
			showTranscript : true
		})

		this.setState({
			renderTranscript : !this.state.renderAgain
		})
	}

    render() {
        return (
            <div>
				{/*Hien thi ra danh sach sinh vien theo lop vd: cmutpm1 */}
				<div className="panel panel-default abcz container">
					<div className="panel-heading">
					<h4 className="titlex">{this.props.deanHandleShow.titleKhoa} - {this.props.deanHandleShow.titleClass}</h4>
					</div>
						<div className="table-responsive table2">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>No</th>
									<th>Student ID</th>
									<th>Student Name</th>
									<th>Student Email</th>
									<th>Transcript</th>
								</tr>
							</thead>
							<tbody>
								{this.renderStudentClass(this.props.deanStudentClass)}
							</tbody>
						</table>
					</div>
				</div>
				{this.props.deanHandleShow.showTranscript === true ?
					<Transcript />
					: "" 
				}
			

			</div>
        );
    }
}
const mapStateToProps = state => {
    return{
		deanHandleShow : state.deanHandleShow,
		deanStudentClass : state.deanStudentClass
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionDeanStudentCourseCreators : bindActionCreators(actionDeanStudentCourse, dispatch),
		actionDeanHandleShowCreators : bindActionCreators(actionDeanHandleShow, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListStudent);
