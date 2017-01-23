import $ from 'jquery'
import fetch from 'isomorphic-fetch'

export const addOption = () => {
	return {
		type: 'ADD_OPTION'
	}
};

// For new poll action send undefined poll parameter
export const editPoll = (poll) => {
	return {
		type: 'EDIT_POLL',
		poll
	}
};

export const changeText = (prop,text,index) => {
	return {
		type:'CHANGE_TEXT',
		prop,
		text,
		index
	}
}

const sendPoll = () => {
	return {
		type:'SEND_POLL',
	}
};

const pollUpdateResponse = (response) => {
	return {
		type:'POLL_UPDATE_RESPONSE',
		response
	}
};

const gettingPolls = () => {
	return {
		type:'GETTING_POLLS',
	}
};

const receivePolls = (polls) => {
	return {
		type:'RECEIVE_POLLS',
		polls
	}
};

export function getPolls() {
	
	return function(dispatch) {
		
		dispatch(gettingPolls());
		
		return fetch('/polls', {
			method: 'GET',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			dispatch(receivePolls(response.json());
		});
	}
};

export function editPoll(pollLink,poll) {
	
	return function(dispatch) {
		
		dispatch(sendPoll());
		
		return fetch('/editPoll', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({pollLink:pollLink,poll:poll})
		})
		.then(response => {
			dispatch(pollUpdateResponse(response.json().message));
		});
	}
};

export function vote(pollId,vote) {
	
	return function(dispatch) {
		
		dispatch(sendVote());
		
		return fetch('/vote', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({pollId:pollId,vote:vote})
		})
		.then(response => {
			if(response.json().message === 'Vote submitted') {
				getPolls();
			} else {
				// TODO: Add action for vote submit failure message
			}
		});
	}
};