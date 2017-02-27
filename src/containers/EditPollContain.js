import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPoll from '../components/EditPoll'
import { savePoll, changeText, addOption, pollUpdateResponse, removeOption, newPoll, getOnePoll } from '../actions'

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
};

const pollValidation = (poll) => {
	let invalidObj = {};
	if(poll.title === '' || typeof poll.title === 'undefined') {
		invalidObj = { message: 'Poll title required', class:'alert-danger', title:'has-error' };
	}
	let optDuplicate = poll.options.slice(0).sort().reduce((dupFound,item,ind,arr) => {
		if(dupFound) {
			return true;
		}
		return item === arr[ind + 1];
	},false);
	if(optDuplicate) {
		let message = (invalidObj.message ? invalidObj.message + ' & o' : 'O') + 'ptions must be unique';
		invalidObj = Object.assign({},invalidObj,{ message: message, class:'alert-danger', options:'has-error' });
	}
	return invalidObj;
};

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
		poll:state.selectedPoll,
		displayMessage:state.displayMessage
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
			let pollInvalid = pollValidation(poll);
			if(pollInvalid !== {}) {
				dispatch(pollUpdateResponse(pollInvalid));
			} else {
				dispatch(savePoll(pollLink,poll));
			}
		},
		onAddOptClick: () => {
			dispatch(addOption());
		},
		onRemoveOptClick: (optionsLength) => {
			if(optionsLength > 2) {
				dispatch(removeOption());
			}
		},
		newPoll: () => {
			dispatch(newPoll());
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(EditPollContain);