
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

const editPoll = (state = defaultPoll,action) => {
	switch(action.type) {
		case 'ADD_OPTION':
			return Object.assign({},state,{options:[].concat(state.options,[''])});
		case 'EDIT_POLL':
			return action.poll || defaultPoll;
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
	editPoll,
	user
});

export default votingApp;