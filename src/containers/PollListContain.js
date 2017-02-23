import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollList from '../components/PollList'
import { deletePoll, getPolls } from '../actions'

class PollListContain extends Component {
	componentDidMount() {
		this.props.getPolls(this.props.location.pathname === '/myPolls');
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.location.pathname !== this.props.location.pathname) {
			this.props.getPolls(nextProps.location.pathname === '/myPolls');
		}
	}
	
	render() {
		return <PollList {...this.props}></PollList>
	}
	
}

const mapStateToProps = (state) => {
	return {
		polls:state.polls,
		userId:state.user._id
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPolls: (userOnly) => {
			dispatch(getPolls(userOnly));
		},
		onDeleteClick: (pollLink) => {
			dispatch(deletePoll({link:pollLink}));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PollListContain);