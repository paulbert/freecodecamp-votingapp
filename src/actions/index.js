
import fetch from 'isomorphic-fetch'

export const addOption = () => {
	return {
		type: 'ADD_OPTION'
	}
};

export const removeOption = () => {
	return {
		type: 'REMOVE_OPTION'
	}
};

export const newPoll = () => {
	return {
		type: 'NEW_POLL'
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

export const pollUpdateResponse = (response) => {
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

const checkingLoggedIn = () => {
	return {
		type: 'CHECKING_LOGGED_IN'
	}
};

const receiveUserInfo = (user) => {
	return {
		type: 'RECEIVE_USER_INFO',
		user
	}
};

const sendVote = () => {
	return {
		type: 'SEND_VOTE'
	}
};

const tryDeletePoll = () => {
	return {
		type: 'TRY_DELETE_POLL'
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

export function getPolls(userOnly) {
	
	return function(dispatch) {
		
		dispatch(gettingPolls());
		
		return fetchGet('/polls?userOnly=' + userOnly)
		.then(response => {
			response.json().then((json) => dispatch(receivePolls(json)));
		});
	}
};

export function getOnePoll(pollLink) {
	
	return function(dispatch) {
		dispatch(gettingOnePoll());
		
		return fetchGet('/onePoll?pollLink=' + pollLink)
		.then(response => {
			response.json().then((json) => dispatch(receiveOnePoll(json)));
		});
	}
}

export function checkLoggedIn() {
	
	return function(dispatch) {
		dispatch(checkingLoggedIn());
		
		return fetchGet('/userInfo')
		.then(response => {
			response.json().then((json) => {
				return dispatch(receiveUserInfo(json))
			});
		});
	}
	
};

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
				dispatch(pollUpdateResponse(res));
			});
		});
	}
};

export function deletePoll(pollQuery) {
	
	return function(dispatch) {
		
		dispatch(tryDeletePoll());
		
		return fetchPost('/removePoll',{pollQuery:pollQuery})
		.then(response => {
			response.json().then((res) => {
				console.log(res);
				dispatch(getPolls());
			});
		});
	}
	
}

export function vote(pollLink,vote) {
	
	return function(dispatch) {
		
		dispatch(sendVote());
		
		return fetchPost('/vote',{pollLink:pollLink,vote:vote})
		.then(response => {
			response.json().then((json) => {
				if(json.message === 'Vote submitted') {
					dispatch(getOnePoll(pollLink));
				} else {
					// TODO: Add action for vote submit failure message
				}
			});
		});
	}
};