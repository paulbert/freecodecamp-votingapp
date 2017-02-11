import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { editPoll, getPolls } from '../actions'

class PollListContain extends Component {
	componentDidMount() {
		this.props.getPolls();
	}
	
	render() {
		const { polls, onPollEditClick } = this.props;
		return <PollList polls={polls}></PollList>
	}
	
}

const mapStateToProps = (state) => {
	return {
		polls:state.polls
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