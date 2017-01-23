import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { savePredictions } from '../actions'

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
			dispatch(editPoll(pollLink,poll));
		}
	}
};

const PollListContain = connect(mapStateToProps,mapDispatchToProps)(PollList);

export default PollListContain;