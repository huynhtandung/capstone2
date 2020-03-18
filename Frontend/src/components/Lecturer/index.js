import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LecturerMenu from './Menu';
import LecturerHome from './Home';
import LecturerInputGrade from './InputGrade';
import LecturerRequest from './Request';
import Logout from '../Logout';
import Footer from '../Header_Footer/footer'
const routes = [
	{
		path : '/lecturer/home',
		exact : true,
		main : ({location, match})=><LecturerHome location={location} match={match}/>
    },
    {
		path : '/lecturer/input-grade',
		exact : true,
		main : ({location, match})=><LecturerInputGrade location={location} match={match}/>
	},
	{
		path : '/lecturer/request',
		exact : true,
		main : ({location, match})=><LecturerRequest location={location} match={match}/>
	},
	{
		path : '/lecturer/logout',
		exact : true,
		main : ({location, match})=><Logout location={location} match={match}/>
	}
	
]

class Lecturer extends Component {
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
				<div className="">
					<LecturerMenu />
					<Switch>
						{this.showRoutes(routes)}
					</Switch>
				
				</div>
            </Router>
        );
    }
}

export default Lecturer;
