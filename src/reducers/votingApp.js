
import { combineReducers } from 'redux';

const defaultPoll = { title:'', desc:'', options: ['','']};

const polls = (state = [],action) => {
	switch(action.type) {
		case 'RECEIVE_POLLS':
			return action.polls;
		default:
			return state;
	}
};

const selectedPoll = (state = defaultPoll,action) => {
	switch(action.type) {
		case 'RECEIVE_ONE_POLL':
			return action.poll;
		// ACTIONS FOR POLL DETAIL PAGE
		// ACTIONS FOR EDITING POLL PAGE
		case 'ADD_OPTION':
			return Object.assign({},state,{options:[].concat(state.options,[''])});
		case 'REMOVE_OPTION':
			let options = state.options,
				optionsLength = options.length;
			return Object.assign({},state,{options:options.slice(0,optionsLength - 1)});
		case 'NEW_POLL':
			return defaultPoll;
		case 'CHANGE_TEXT':
			let newText = {};
			if(action.prop === 'options') {
				newText.options = [].concat(state.options);
				newText.options[action.index] = action.text;
			} else {
				newText[action.prop] = action.text;
			}
			return Object.assign({},state,newText);
		default:
			return state;
	}
};

const user = (state = {empty:true},action) => {
	switch(action.type) {
		case 'RECEIVE_USER_INFO':
			return action.user;
		default:
			return state;
	}
};

const defaultMessage = { class:'hidden', message: '', title:'', options:'' }

const displayMessage = (state = defaultMessage,action) => {
	switch(action.type) {
		case 'POLL_UPDATE_RESPONSE':
			return Object.assign({},defaultMessage,action.response);
		case 'NEW_POLL':
		case 'GETTING_ONE_POLL':
			return defaultMessage;
		default:
			return state;
	}
};

const votingApp = combineReducers({
	polls,
	selectedPoll,
	user,
	displayMessage
});

export default votingApp;