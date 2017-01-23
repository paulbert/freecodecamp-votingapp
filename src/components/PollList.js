import React from 'react'
import { Link } from 'react-router'

const PollList = ({polls,onPollEditClick}) => (
	
	<section>
		<Link className="btn btn-primary btn-lg" onClick={onPollEditClick()} to="/editPoll">New Poll</Link>
		<div className="btn-group-vertical">
			{polls.map((poll) => {
				(
					<Link className="btn btn-default" to={'/poll/' + poll.id}>{poll.title}</Link>
				);
			})}
		</div>
	</section>

);

export default PollList;