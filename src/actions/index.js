
import fetch from 'isomorphic-fetch'

export const addOption = () => {
	return {
		type: 'ADD_OPTION'
	}
};

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

const gettingOnePoll = () => {
	return {
		type: 'GETTING_ONE_POLL'
	}
};

const receiveOnePoll = (poll) => {
	return {
		type: 'RECEIVE_ONE_POLL',
		poll
	}
};

const fetchGet = (url) => {
	return fetch(url, {
		method: 'GET',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		}
	});
};

export function getPolls() {
	
	return function(dispatch) {
		
		dispatch(gettingPolls());
		
		return fetchGet('/polls')
		.then(response => {
			response.json().then((json) => dispatch(receivePolls(json)));
		});
	}
};

export function getOnePoll(pollLink) {
	
	return function(dispatch) {
		dispatch(gettingOnePoll);
		
		return fetchGet('/onePoll?pollLink=' + pollLink)
		.then(response => {
			response.json().then((json) => dispatch(receiveOnePoll(json)));
		});
	}
}

const fetchPost = (url,reqBody) => {
	return fetch(url, {
		method: 'POST',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	})
};
	

// For new poll action send undefined pollLink parameter
export function savePoll(pollLink,poll) {
	
	return function(dispatch) {
		
		dispatch(sendPoll());
		
		return fetchPost('/savePoll',{pollLink:pollLink,poll:poll})
		.then(response => {
			response.json().then((res) => {
				console.log(res);
				dispatch(pollUpdateResponse(res.message));
			});
		});
	}
};

export function vote(pollId,vote) {
	
	return function(dispatch) {
		
		dispatch(sendVote());
		
		return fetchPost('/vote',{pollId:pollId,vote:vote})
		.then(response => {
			response.json().then((json) => {
				if(json.message === 'Vote submitted') {
					getPolls();
				} else {
					// TODO: Add action for vote submit failure message
				}
			});
		});
	}
};