import React from 'react'
import { Link } from 'react-router'

const PollList = ({polls,onPollEditClick}) => {
	
	return (
	
	<section>
		<Link className="btn btn-primary btn-lg" onClick={() => onPollEditClick()} to="/editPoll">New Poll</Link>
		<div className="btn-group-vertical">
			{polls.map((poll,ind) => {
				return (
					<Link key={ind} className="btn btn-default" to={'/poll/' + poll.link}>{poll.title}</Link>
				);
			})}
		</div>
	</section>

)};

export default PollList;