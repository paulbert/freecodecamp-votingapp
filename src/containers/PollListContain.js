import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { editPoll, getPolls } from '../actions'

class PollListContain extends Component {
	componentDidMount() {
		this.props.getPolls();
	}
	
	render() {
		return <PollList {...this.props}></PollList>
	}
	
}

const mapStateToProps = (state) => {
	return {
		polls:state.polls,
		userId:state.user._id
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPolls: () => {
			dispatch(getPolls());
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PollListContain);