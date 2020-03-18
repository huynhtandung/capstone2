import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header'
import Content from './Content';
import Address from './TableAddress';
import Logout from '../Logout';

const routes = [
	{
		path : '/dean/logout',
		exact : true,
		main : ({location, match})=><Logout location={location} match={match}/>
	}
	
]

class Student extends Component {
    showRoutes = (routes) =>{
		var result = null;
		if(routes.length > 0){
			result = routes.map((route, index)=>{
				return(
					<Route 
						key={index}
						path={route.path} 
						exact={route.exact}
						component={route.main} 
					/>
				)
			})
		}
		return result;
	}
    render() {
        return (
            <Router>
				<div className="container">
                    <Header />
					<Content />
					<br />
					<Address />
					<Switch>
						{this.showRoutes(routes)}
					</Switch>
				</div>
            </Router>
        );
    }
}

export default Student;
