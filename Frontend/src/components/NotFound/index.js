import React,{Component} from 'react';
//import {Redirect} from 'react-router-dom';
import './styles.css'

class FileNotFound extends Component {
    componentDidMount(){
        sessionStorage.setItem('isLogin', false);
        sessionStorage.setItem('user', '');
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('isHead', '')
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions">
                                <a href="http://localhost:3000" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                    &nbsp;Take me home
                                </a>
                                <a href="https://mail.google.com/mail/u/0/#inbox" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileNotFound;
