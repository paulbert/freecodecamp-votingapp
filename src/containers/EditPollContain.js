import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPoll from '../components/EditPoll'
import { savePoll, changeText, addOption, newPoll, getOnePoll } from '../actions'

class EditPollContain extends Component {
	
	componentDidMount() {
		const pollLink = this.props.params.pollLink;
		if(pollLink) {
			this.props.getPoll(pollLink);
		} else {
			this.props.newPoll();
		}
	}
	
	render() {
		return <EditPoll { ...this.props }></EditPoll>
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

const mapDispatchToPropsChild = (dispatch) => {
	return {
		onTextChange: (prop,text,index) => {
			dispatch(changeText(prop,text,index));
		},
		onPollSubmit: (pollLink,poll) => {
			dispatch(savePoll(pollLink,poll));
		},
		onAddOptClick: () => {
			dispatch(addOption());
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(EditPollContain);