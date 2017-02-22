import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPoll from '../components/EditPoll'
import { savePoll, changeText, addOption, newPoll, getOnePoll } from '../actions'

let update = false;

const updatePoll = (props) => {
	const pollLink = props.params.pollLink;
	if(pollLink) {
		props.getPoll(pollLink);
		update = true;
	} else {
		props.newPoll();
		update = false;
	}
}

class EditPollContain extends Component {
	
	componentDidMount() {
		updatePoll(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.params.pollLink !== this.props.params.pollLink) {
			updatePoll(nextProps);
		}
	}
	
	render() {
		return <EditPoll { ...this.props } update={update}></EditPoll>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditPollContain);