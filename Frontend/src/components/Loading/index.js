import React, { Component } from 'react';
import Loading from '../../assets/ld.gif';
import './styles.css';
import {connect} from 'react-redux';

class GlobalLoading extends Component {
	render() {
		return (
			<div>
				{ 	this.props.loading === true 
					?<div className="globalLoading">
						<img
							alt='Loding'
							src={Loading}
							className="gif"
                		/>
					</div>
				:	" "
			}
			</div>		
		);
	}	

}
const mapStateToProps = state => {
    return{
		loading : state.loading
    };
};
export default connect(mapStateToProps, null)(GlobalLoading);
