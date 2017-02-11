import React from 'react'
import { Link } from 'react-router'

const PollList = ({polls,onPollEditClick}) => {
	
	return (
	
	<section>
		<div className="list-group">
			{polls.map((poll,ind) => {
				return (
					<Link key={ind} className="list-group-item" to={'/poll/' + poll.link}>{poll.title}<Link to={'/editPoll/' + poll.link} className="btn btn-default editLink-pos">Edit</Link></Link>
				);
			})}
		</div>
	</section>

)};

export default PollList;