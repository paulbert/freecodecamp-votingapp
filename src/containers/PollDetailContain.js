import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollDetail from '../components/PollDetail'
import { vote,getOnePoll } from '../actions'

class PollDetailContain extends Component {
	
	componentDidMount() {
		this.props.getPoll(this.props.params.pollLink);
	}
	
	render() {
		const { poll, onVoteClick } = this.props;
		return <PollDetail poll={poll} onVoteClick={onVoteClick}></PollDetail>
	}
	
}

const mapStateToProps = (state) => {
	return {
		poll:state.selectedPoll
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPoll:(pollLink) => {
			dispatch(getOnePoll(pollLink));
		},
		onVoteClick: (pollLink,voteString) => {
			dispatch(vote(pollLink,voteString));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PollDetailContain);