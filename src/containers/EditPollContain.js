import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPoll from '../components/EditPoll'
import { savePoll, changeText, addOption, newPoll } from '../actions'

class PollDetailContain extends Component {
	
	componentDidMount() {
		const pollLink = this.props.params.pollLink;
		if(pollLink) {
			this.props.getPoll(pollLink);
		} else {
			this.props.newPoll();
		}
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
		onTextChange: (prop,text,index) => {
			dispatch(changeText(prop,text,index));
		},
		onPollSubmit: (pollLink,poll) => {
			dispatch(savePoll(pollLink,poll));
		},
		onAddOptClick: () => {
			dispatch(addOption());
		},
		newPoll: () => {
			dispatch(newPoll());
		}
	}
};

const EditPollContain = connect(mapStateToProps,mapDispatchToProps)(EditPoll);

export default EditPollContain;