import React, { Component } from 'react';
import '../../Css/Menu.css';
import './styles.css';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../../Header_Footer/header'

const MenuLink = ({ label, to, activeOnlyWhenExact, check }) => {
	return (
		<Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
			var active = match ? 'active-link' : '';
			return (
				<li className={`my-li ${active}`}>
					<Link to={to}>
						{label}
					</Link>
				</li>
			)
		}} />
	)
}

class DeanMenu extends Component {
	render() {
		const menus = [
			{
				name: <i className="glyphicon glyphicon-home">&nbsp;Home</i>,
				to: '/dean/home',
				exact: true
			},
			{
				name: <i className="glyphicon glyphicon-search">&nbsp;ViewGrade</i>,
				to: '/dean/view-grade',
				exact: true
			},
			{
				name: <i className="glyphicon glyphicon-eye-open">&nbsp;ViewTranscript</i>,
				to: '/dean/view-transcript',
				exact: true
			},
			{
				name: (<i className="glyphicon glyphicon-inbox">
					&nbsp;Request&nbsp;
							<span className="label numberRequest">{this.props.numberRequest ? this.props.numberRequest : null}</span>
				</i>),
				to: '/dean/request',
				exact: true
			},
			{
				name: <i className="glyphicon glyphicon-log-out">&nbsp;Logout</i>,
				check: true,
				to: '/dean/logout',
				exact: true
			}
		]
		return (
			<div>
				<nav className="navbar navbar-inverse menu_background_color">
					<div className="container padding_0">
						<div className="navbar-header padding_0">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#menu">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>

						<div className="navbar-collapse  collapse padding_0" id="menu">
							<ul className="nav navbar-nav">
								{this.showMenu(menus)}
							</ul>

						</div>
					</div>
				</nav>
				<Header Name={sessionStorage.getItem('name')}/>
			</div>
		);
	}
	showMenu = (menus) => {
		var result = null;
		if (menus.length > 0) {
			result = menus.map((menu, index) => {
				return (
					<MenuLink key={index}
						label={menu.name}
						to={menu.to}
						activeOnlyWhenExact={menu.exact}
						check={menu.check}
					/>
				)
			})
		}
		return result;
	}
}
const mapStateToProps = state => {
	return {
		numberRequest: state.numberRequest
	};
}
export default connect(mapStateToProps, null)(DeanMenu);

