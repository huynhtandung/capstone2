import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionLogout} from '../../actions/logout'
//import sha256 from 'sha256'


class Logout extends Component {
    componentDidMount(){
        this.props.actionLogoutC();
        // eslint-disable-next-line no-unused-expressions
        /*dispatch => {
            // Your code here...
            dispatch({ type: "USER_LOGGED_OUT" });
         };*/
        sessionStorage.setItem('isLogin', ('false'));
        sessionStorage.setItem('user', '');
        sessionStorage.setItem('isHead', '');
        sessionStorage.setItem('address', '');
        //console.log('đ')
    }

    render() {
        var {location} = this.props;
        return (
            <Redirect to={{
                pathname : '/',
                state : {
                    from : location
                },
                mark : 'logout'
            }}/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        actionLogoutC : () =>{
            dispatch(actionLogout())
        }
       
    }
};
export default connect(null, mapDispatchToProps)(Logout);
