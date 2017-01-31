import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollDetail from '../components/PollDetail'
import { vote } from '../actions'

class PollDetailContain extends Component {
	
}

const mapStateToProps = (state,ownProps) => {
	return {
		poll:state.polls.filter((poll) => {
			return poll.id === ownProps.pollId;
		})[0]
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onVoteClick: (pollId,vote) => {
			dispatch(vote(pollId,vote));
		}
	}
};

const PollDetailContain = connect(mapStateToProps,mapDispatchToProps)(PollDetail);

export default PollDetailContain;