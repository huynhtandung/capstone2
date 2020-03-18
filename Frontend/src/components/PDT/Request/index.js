import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionGetRequest from '../../../actions/GetRequest/getRequestForPDT'
import { bindActionCreators } from 'redux';
import PDTMenu from '../Menu';
import TableItem from './TableItem'
import Modal from '../../Modal'
import Footer from '../../Header_Footer/footer'

class PDTRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			newsPerPage: 8,
			data: ''
		};
	}
	componentDidMount() {
		const { actionGetRequestCreators } = this.props;
		const { actionGetRequestForPDT } = actionGetRequestCreators
		actionGetRequestForPDT({})
	}
	chosePage = (event) => {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}
	/*sortArray = (arr) =>{
		return arr.sort(function(a, b){
			return a.AcceptByPDT - b.AcceptByPDT
		})
	}*/
	chooseRequest = (data) => {
		console.log("State: ", data)
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
		//console.log("Request Đây: ", this.sortArray(this.props.requests))
		if (this.props.requests.length > 0) {
			const currentTodos = this.props.requests.slice(indexOfFirstNews, indexOfLastNews);
			renderTodos = currentTodos.map((request, index) => {
				return (
					<TableItem stt={index + 1 + (currentPage - 1) * newsPerPage} key={index} data={request} currentRequest={this.chooseRequest} />
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
					<Modal data={this.state.data} />
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
		requests: state.getRequest
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionGetRequestCreators: bindActionCreators(actionGetRequest, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(PDTRequest);
