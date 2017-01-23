import React from 'react'

const PollList = ({polls,onPollEditClick}) => (
	
	<section>
		<button className="btn btn-primary btn-lg" onClick={onPollEditClick()}>New Poll</button>
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