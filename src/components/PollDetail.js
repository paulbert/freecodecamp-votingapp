import React from 'react'

const PollBody = (poll,onVoteClick) => (
	
	<section>
		<h2>{poll.title}</h2>
		<p>{poll.desc}</p>
		<div className="btn-group-vertical">
		{poll.options.map((opt) => (
			<button className="btn btn-default" onClick={onVoteClick(pollId,vote)}>{opt}</button>
			))
		}
	</section>

);

export default PollBody;