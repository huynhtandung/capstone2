import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

class Index extends Component {
    render() {
        var {location} = this.props;
        //console.log(sessionStorage.getItem('isLogin'))
        return <Redirect to={{
            pathname : '/login',
            state : {
                from : location
            }
        }}/>
    }
}

export default Index;
