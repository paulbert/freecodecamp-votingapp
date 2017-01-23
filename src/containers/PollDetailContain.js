import { connect } from 'react-redux'
import PollDetail from '../components/PollDetail'
import { savePredictions } from '../actions'

const mapStateToProps = (state,ownProps) => {
	return {
		poll:state.polls.filter((poll) => {
			return poll.id === ownProps.pollId;
		})[0]
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onVoteClick: (pollId,vote) => {
			dispatch(vote(pollId,vote));
		}
	}
};

const PollDetailContain = connect(mapStateToProps,mapDispatchToProps)(PollDetail);

export default PollDetailContain;