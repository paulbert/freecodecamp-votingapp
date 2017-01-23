import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { editPoll } from '../actions'

const mapStateToProps = (state) => {
	return {
		polls:state.polls
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPollEditClick: (poll) => {
			dispatch(editPoll(poll));
		}
	}
};

const PollListContain = connect(mapStateToProps,mapDispatchToProps)(PollList);

export default PollListContain;