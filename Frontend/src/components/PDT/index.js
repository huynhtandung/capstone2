import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PDTMenu from './Menu';
import PDTHome from './Home';
import PDTInputGrade from './InputGrade';
import PDTTranscript from './Transcript'
import PDTRequest from './Request'
import Logout from '../Logout/index';
import Footer from '../Header_Footer/footer'


const routes = [
	{
		path : '/academic-affairs-department/home',
		exact : true,
		main : ({location, match})=><PDTHome location={location} match={match} />
    },
    {
		path : '/academic-affairs-department/input-grade',
		exact : true,
		main : ({location, match})=><PDTInputGrade location={location} match={match}/>
	},
	{
		path : '/academic-affairs-department/transcript',
		exact : true,
		main : ({location, match})=><PDTTranscript location={location} match={match}/>
	},
	{
		path : '/academic-affairs-department/request',
		exact : true,
		main : ({location, match})=><PDTRequest location={location} match={match}/>
	},
	{
		path : '/academic-affairs-department/logout',
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
					<PDTMenu />
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
