import React from 'react'
import { Link } from 'react-router'

require('../css/PollList.scss');

const PollList = ({polls,onPollEditClick}) => {
	
	return (
	
	<section>
		<div className="list-group">
			{polls.map((poll,ind,arr) => {
				let thisClass = 'list-group-item';
				thisClass += ind === 0 ? ' list-group-item-first' : ind === arr.length - 1 ? ' list-group-item-last' : '';
				return (
					<div key={ind} className="list-group-item-contain">
						<Link className={thisClass} to={'/poll/' + poll.link}>{poll.title}</Link>
						<Link to={'/editPoll/' + poll.link} className="btn btn-default editLink-pos">Edit</Link>
					</div>
				);
			})}
		</div>
	</section>

)};

export default PollList;