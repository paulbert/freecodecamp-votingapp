import React from 'react'
import createChartData from '../logic/createChartData.js'
import {Bar} from 'react-chartjs-2'

const PollBody = ({poll,onVoteClick}) => {
	
	let dataAndOptions = createChartData(poll);
	
	return (
	
	<section>
		<h2>{poll.title}</h2>
		<p>{poll.desc}</p>
		<p><em>{'A poll by ' + poll.userName}</em></p>
		<div className="btn-group-vertical">
		{poll.options.map((opt,ind) => (
			<button key={ind} className="btn btn-default" onClick={() => onVoteClick(poll.link,opt)}>{opt}</button>
			))
		}
		</div>
		<Bar {...dataAndOptions} />
	</section>

)};

export default PollBody;