import { connect } from 'react-redux'
import EditPoll from '../components/EditPoll'
import { savePoll } from '../actions'
import { changeText } from '../actions'
import { addOption } from '../actions'

const mapStateToProps = (state) => {
	return {
		poll:state.selectedPoll
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

const EditPollContain = connect(mapStateToProps,mapDispatchToProps)(EditPoll);

export default EditPollContain;