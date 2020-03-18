import React,{Component} from 'react';
import './App.css';
import GlobalLoading from './components/Loading/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';

import StudentHome from './components/Student/Home';
import StudentTranscript from './components/Student/Transcript';
import StudentDetailTranscript from './components/Student/DetailTranscript';

import Logout from './components/Logout';
import LecturerHome from './components/Lecturer/Home';
import LecturerInputGrade from './components/Lecturer/InputGrade';
import LecturerRequest from './components/Lecturer/Request'

import DeanHome from './components/Dean/Home';
import DeanViewGrade from './components/Dean/ViewGrade';
import DeanViewTranscript from './components/Dean/ViewTranscript'
import DeanRequest from './components/Dean/Request'

import PDTHome from './components/PDT/Home';
import PDTInputGrade from './components/PDT/InputGrade';
import PDTTranscript from './components/PDT/Transcript'
import PDTRequest from './components/PDT/Request'


import configStore from './redux/configStore';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FileNotFound from './components/NotFound/index'

import AdminPage from './components/Admin/index'




const store = configStore();

const StudentRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  	(sessionStorage.getItem('isLogin') === null)
		?<Redirect to='/login' /> 
		:(sessionStorage.getItem('user') !== 'Student')
		? <Redirect to='/not-found' />
		:<Component {...props} />
	)}/>
)

const LecturerRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  	(sessionStorage.getItem('isLogin') === null)
		?<Redirect to='/login' /> 
		:(sessionStorage.getItem('user') !== 'Lecturer')
		? <Redirect to='/not-found' />
		:<Component {...props} />
	)}/>
)

const DeanRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  	(sessionStorage.getItem('isLogin') === null)
		?<Redirect to='/login' /> 
		:(sessionStorage.getItem('user') !== 'Dean')
		? <Redirect to='/not-found' />
		:<Component {...props} />
	)}/>
)

const PDTRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  	(sessionStorage.getItem('isLogin') === null)
		?<Redirect to='/login' /> 
		:(sessionStorage.getItem('user') !== 'AAD')
		? <Redirect to='/not-found' />
		:<Component {...props} />
	)}/>
)

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  	(sessionStorage.getItem('isLogin') === null)
		?<Redirect to='/login' /> 
		:(sessionStorage.getItem('user') !== 'ADMIN')
		? <Redirect to='/not-found' />
		:<Component {...props} />
	)}/>
)

class App extends Component {
    render() {
        return (
			<Provider store={store}>
				<ToastContainer autoClose={4000} />
				<GlobalLoading />
				<Router>
					<Switch>
						<Route path="/" component={Index} exact={true} />
						<Route path="/login" component={Login} exact={true} />
						<Route path="/not-found" component={FileNotFound} exact={true} />

						<StudentRoute path="/student/home" component={StudentHome} exact={true} />
						<StudentRoute path="/student/detail-transcript" component={StudentDetailTranscript} exact={true} />
						<StudentRoute path="/student/transcript" component={StudentTranscript} exact={true} />
						<StudentRoute path="/student/logout" component={Logout} exact={true} />

						<LecturerRoute path="/lecturer/home" component={LecturerHome} exact={true} />
						<LecturerRoute path="/lecturer/input-grade" component={LecturerInputGrade} exact={true} />
						<LecturerRoute path="/lecturer/request" component={LecturerRequest} exact={true} />
						<LecturerRoute path="/lecturer/logout" component={Logout} exact={true} />
			
						<DeanRoute path="/dean/home" component={DeanHome} exact={true} />
						<DeanRoute path="/dean/view-grade" component={DeanViewGrade} exact={true} />
						<DeanRoute path="/dean/view-transcript" component={DeanViewTranscript} exact={true} />
						<DeanRoute path="/dean/request" component={DeanRequest} exact={true} />
						<DeanRoute path="/dean/logout" component={Logout} exact={true} />

						<PDTRoute path="/academic-affairs-department/home" component={PDTHome} exact={true} />
						<PDTRoute path="/academic-affairs-department/input-grade" component={PDTInputGrade} exact={true} />
						<PDTRoute path="/academic-affairs-department/transcript" component={PDTTranscript} exact={true} />
						<PDTRoute path="/academic-affairs-department/request" component={PDTRequest} exact={true} />
						<PDTRoute path="/academic-affairs-department/logout" component={Logout} exact={true} />

						<AdminRoute path="/admin/home" component={AdminPage} exact={true} />
						<AdminRoute path="/admin/logout" component={Logout} exact={true} />

					</Switch>	 
				</Router>
			</Provider>
        );
    }
}
export default App;
