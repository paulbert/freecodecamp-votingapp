import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { savePoll } from '../actions'
import { changeText } from '../actions'

const mapStateToProps = (state) => {
	return {
		poll:state.editPoll
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
		}
	}
};

const PollListContain = connect(mapStateToProps,mapDispatchToProps)(PollList);

export default PollListContain;