import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionGetRequest from '../../../actions/GetRequest/getRequestForDean'
import {bindActionCreators} from 'redux';
import PDTMenu from '../Menu';
import TableItem from './TableItem'
import Modal from '../../Modal/index'
import Footer from '../../Header_Footer/footer'

/*class TableItem extends React.Component {
	render() {
	  return (
		<tr>
			<td>{this.props.stt}</td>
			<td>
			  <span>
			  		{"Lecturer " + this.props.data.Lecturer_Name + " - " +
						this.props.data.Dep_Name + " has requested to edit the grade of " + this.props.data.OutLine_Name
						+ " - " + this.props.data.Course_Name
					}
			  </span>
			</td>
			<td>
				{this.props.data.DateTime}
			</td>
			<td>
				{
					this.props.data.AcceptByDean === 0
						? (
							<div>
								<button type="button" className="btn btn-success">Accept</button>
								<button type="button" className="btn btn-warning">Deny</button>
							</div>
						)
						: this.props.data.AcceptByDean === 1
							? "Accepted"
							: "Denied"
				}
			</td>
		  </tr>
	  )
	}
  }*/
var CryptoJS = require('crypto-js')
class DeanRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			newsPerPage: 8,
			data : ''
		};
	}
	componentDidMount(){
		const {actionGetRequestCreators} = this.props;
		const {actionGetRequestForDean} = actionGetRequestCreators
		actionGetRequestForDean({
			//Dean_ID : sessionStorage.getItem('id')
			Dean_ID : CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8),
		})
	}
	chosePage = (event) => {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}
	chooseRequest = (data) =>{
		this.setState({
			data
		})
	}
	render() {
		const currentPage = this.state.currentPage;
		const newsPerPage = this.state.newsPerPage;
		const indexOfLastNews = currentPage * newsPerPage;
		const indexOfFirstNews = indexOfLastNews - newsPerPage;
		let renderTodos = null;
		let pageNumbers = []
		if(this.props.requests.length > 0){
			const currentTodos = this.props.requests.slice(indexOfFirstNews, indexOfLastNews);
			renderTodos = currentTodos.map((request, index) => {
				return (
					<TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={request} currentRequest={this.chooseRequest} />
				)
			});

			//const pageNumbers = [];
			for (let i = 1; i <= Math.ceil(this.props.requests.length / newsPerPage); i++) {
				pageNumbers.push(i);
			}
		}
if(renderTodos === null){
			renderTodos = (
				<tr>
					<td colSpan="4">
						No Request
					</td>
				</tr>
			)
		}
		return (
			<div className="">
				<PDTMenu />	
				<div className="content container">
				<Modal data={this.state.data}/>
				<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>No</th>
									<th>Request</th>
									<th>Detail</th>
									<th>Reason</th>
									<th>Time</th>
									<th>Action</th>
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
		requests : state.getRequest
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionGetRequestCreators : bindActionCreators(actionGetRequest, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DeanRequest);
