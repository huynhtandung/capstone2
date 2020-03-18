import React, { Component } from 'react';
import '../../Css/Menu.css';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../../Header_Footer/header'
import './styles.css'

const MenuLink = ({label, to, activeOnlyWhenExact})=>{
	return (
		<Route path={to} exact={activeOnlyWhenExact} children={({match})=>{
			var active = match ? 'active-link' : '';
			return (
				<li className={`my-li ${active}`}>
			 		<Link to={to}>
					 	{label}
			 		</Link>
			 	</li>
			)
		}}/>
	)
}

class LecturerMenu extends Component {
	
	render() {
		const menus = [
	{
		name : <i className="glyphicon glyphicon-home">&nbsp;Home</i>,
		to : '/lecturer/home',
		exact : true
	},
	{
		name : <i className="glyphicon glyphicon-tasks">&nbsp;InputGrade</i>,
		to : '/lecturer/input-grade',
		exact : true
	},
	{
		name : <i className="glyphicon glyphicon-inbox">&nbsp;Request&nbsp;
					<span className="label numberRequest">{this.props.numberRequest ? this.props.numberRequest : null}</span>
				</i>,
		to : '/lecturer/request',
		exact : true
	},
	{
		name: <i className="glyphicon glyphicon-log-out">&nbsp;Logout</i>,
		to: '/lecturer/logout',
		exact : true
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

	showMenu = (menus)=>{
		var result = null;
		if(menus.length > 0){
			result = menus.map((menu, index)=>{
				return(
					<MenuLink key={index} 
						label={menu.name} 
						to={menu.to} 
						activeOnlyWhenExact={menu.exact} 
					/>
				)
			})
		}
		return result;
	}
}
const mapStateToProps = state => {
    return{
		numberRequest : state.numberRequest
    };
}
export default connect(mapStateToProps, null)(LecturerMenu);

