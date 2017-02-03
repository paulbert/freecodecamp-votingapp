
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

const user = (state = 'test',action) => {
	return state;
};

const votingApp = combineReducers({
	polls,
	selectedPoll,
	user
});

export default votingApp;