import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import StudentMenu from './Menu/index';
import StudentHome from '../Home';
import StudentTranscript from '../Transcript';
import StudentDetailTranscript from '../DetailTranscript';
import Logout from '../Logout';

import Footer from '../Header_Footer/footer'

const routes = [
	{
		path : '/student/home',
		exact : true,
		main : ({location, match})=><StudentHome location={location} match={match}/>
	},
	{
		path : '/student/detail-transcript',
		exact : true,
		main : ({location, match})=><StudentDetailTranscript location={location} match={match}/>
	},
    {
		path : '/student/transcript',
		exact : true,
		main : ({location, match})=><StudentTranscript location={location} match={match}/>
	},
	{
		path : '/student/logout',
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
				<div>
					<StudentMenu />
					<Switch>
						{this.showRoutes(routes)}
					</Switch>
					<Footer />
				</div>
            </Router>
        );
    }
}

export default Student;
