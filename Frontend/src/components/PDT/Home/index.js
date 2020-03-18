/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
//import StudentMenu from '../Menu/index.js';
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import routes from '../../../Routes/Student';
import '../../Css/Content.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionGetAnnounce from '../../../actions/EditGrade/announce'
import './styles.css'
//import newGif from '../../../assets/new.gif';

import PDTMenu from '../Menu';

import NewGif from '../../../assets/new.gif'
import Footer from '../../Header_Footer/footer'


const gif = {
	position: 'static',
    height: '50%'
};

class TableItem extends React.Component {
	render() {
		var date = new Date();
		var curentDay = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
	  return (
		<tr className={this.props.data.DateTime.split(' ')[1] ===  curentDay ? "active_an" : ""}>
			<td>{this.props.stt}</td>
			<td>
			  <span>
			  		{"Lecturer " + this.props.data.Lecturer_Name + " - " +
						this.props.data.Dep_Name + " has edited the grade of " + this.props.data.OutLine_Name
						+ " - " + this.props.data.Course_Name
					}
					
			  </span>
			</td>
			<td>{this.props.data.Reason}</td>
			<td>
				{this.props.data.DateTime}
			</td>
		  </tr>
	  )
	}
  }

class DeanHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			newsPerPage: 8
		};
	}
	chosePage = (event) => {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}
	componentDidMount() {
		const { actionGetAnnounceCreators } = this.props;
		const { actionGetAnnounce } = actionGetAnnounceCreators;
		actionGetAnnounce({})
	}
	/*renderAnnounce = (announces) => {
		let xhtml = null;
		if (announces.length > 0) {
			xhtml = announces.map((announce, index) => {
				return (
					<tr key={index}>
						<td></td>
					</tr>
					<li key={index}>
						{"Giảng viên: " + announce.Lecturer_Name + " - " +
							announce.Dep_Name + " đã chỉnh sửa cột điểm " + announce.OutLine_Name
							+ " - " + announce.Course_Name + " Vào lúc " + announce.DateTime +
							" Năm học " + announce.Session_Year + " Hoc kỳ " + announce.Session_Semester
						}
					</li>
				)
			})
		}
		return xhtml;
	}*/

	render() {
		const currentPage = this.state.currentPage;
		const newsPerPage = this.state.newsPerPage;
		const indexOfLastNews = currentPage * newsPerPage;
		const indexOfFirstNews = indexOfLastNews - newsPerPage;
		let renderTodos = null;
		let pageNumbers = []
		if(this.props.announces.length > 0){
			const currentTodos = this.props.announces.slice(indexOfFirstNews, indexOfLastNews);
			renderTodos = currentTodos.map((announce, index) => {
				return (
					<TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={announce} />
				)
			});

			//const pageNumbers = [];
			for (let i = 1; i <= Math.ceil(this.props.announces.length / newsPerPage); i++) {
				pageNumbers.push(i);
			}
		}
		if(renderTodos === null){
			renderTodos = (
				<tr>
					<td colSpan="4">
						No Annoucement
					</td>
				</tr>
			)
		}
		return (
			<div className="">
				<PDTMenu />
				<div className="content container">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>No</th>
									<th>Announce</th>
									<th>Reason</th>
									<th>Time</th>
								</tr>
							</thead>
							<tbody>
								{renderTodos}
							</tbody>
						</table>

					</div>

					<div className="pagination-custom">
						<ul id="page-numbers">
							{
								pageNumbers.map(number => {
									if (this.state.currentPage === number) {
										return (
											<li key={number} id={number} className="active">
												{number}
											</li>
										)
									}
									else {
										return (
											<li key={number} id={number} onClick={this.chosePage} >
												{number}
											</li>
										)
									}
								})
							}
						</ul>
					</div>
					
				</div>
				<Footer />
			</div>

		);
	}



}

const mapStateToProps = state => {
	return {
		announces: state.getAnnounce
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionGetAnnounceCreators: bindActionCreators(actionGetAnnounce, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DeanHome);
