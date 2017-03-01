import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollDetail from '../components/PollDetail'
import { vote,getOnePoll,savePoll,changeText } from '../actions'

class PollDetailContain extends Component {
	
	componentDidMount() {
		this.props.getPoll(this.props.params.pollLink);
	}
	
	render() {
		return <PollDetail {...this.props}></PollDetail>
	}
	
}

const mapStateToProps = (state) => {
	return {
		poll:state.selectedPoll,
		userLoggedIn:typeof state.user.empty === 'undefined'
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPoll:(pollLink) => {
			dispatch(getOnePoll(pollLink));
		},
		onVoteClick: (pollLink,voteString) => {
			dispatch(vote(pollLink,voteString));
		},
		onWriteInSubmit: (pollLink, poll) => {
			let {writeIn,...newPoll} = poll,
				newOptions = [].concat(poll.options,[writeIn]);
			dispatch(savePoll(pollLink,Object.assign({},newPoll,{options:newOptions}))).then(dispatch(vote(pollLink,writeIn)));
			
		},
		onTextChange: (prop,text,index) => {
			dispatch(changeText(prop,text,index));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PollDetailContain);