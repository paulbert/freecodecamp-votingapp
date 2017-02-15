import React from 'react'
import { Link } from 'react-router'

require('../css/PollList.scss');

const PollList = ({polls,onPollEditClick}) => {
	
	return (
	
	<section>
		<div className="list-group">
			{polls.map((poll,ind) => {
				return (
					<div key={ind}>
						<Link className="list-group-item" to={'/poll/' + poll.link}>{poll.title}</Link>
						<Link to={'/editPoll/' + poll.link} className="btn btn-default editLink-pos">Edit</Link>
					</div>
				);
			})}
		</div>
	</section>

)};

export default PollList;