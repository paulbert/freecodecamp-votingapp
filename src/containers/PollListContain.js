import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { savePredictions } from '../actions'

const mapStateToProps = (state) => {
	return {
		polls:state.polls
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPollEditClick: (poll) => {
			dispatch(editPoll(pollId,vote)).then(() => {
				dispatch(push('/editPoll'));
			});
		}
	}
};

const PollListContain = connect(mapStateToProps,mapDispatchToProps)(PollList);

export default PollListContain;