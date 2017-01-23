import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { editPoll } from '../actions'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
	return {
		polls:state.polls
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPollEditClick: (poll) => {
			dispatch(editPoll(poll));
			dispatch(push('/editPoll'));
		}
	}
};

const PollListContain = connect(mapStateToProps,mapDispatchToProps)(PollList);

export default PollListContain;