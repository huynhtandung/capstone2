import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DeanMenu from './Menu';
import DeanHome from './Home';
import DeanViewGrade from './ViewGrade';
import DeanViewTranscript from './ViewTranscript'
import DeanRequest from './Request'
import Logout from '../Logout/index';
import Footer from '../Header_Footer/footer'


const routes = [
	{
		path : '/dean/home',
		exact : true,
		main : ({location, match})=><DeanHome location={location} match={match}/>
    },
    {
		path : '/dean/view-grade',
		exact : true,
		main : ({location, match})=><DeanViewGrade location={location} match={match}/>
	},
	{
		path : '/dean/view-transcript',
		exact : true,
		main : ({location, match})=><DeanViewTranscript location={location} match={match}/>
	},
	{
		path : '/dean/request',
		exact : true,
		main : ({location, match})=><DeanRequest location={location} match={match}/>
	},
	{
		path : '/dean/logout',
		exact : true,
		main : ({location, match})=><Logout location={location} match={match}/>
	}
	
]

class Dean extends Component {
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
					<DeanMenu />
					<Switch>
						{this.showRoutes(routes)}
					</Switch>
					<Footer />
				</div>
            </Router>
        );
    }
}

export default Dean;
