import React from 'react'
import createChartData from '../logic/createChartData.js'
import {Bar} from 'react-chartjs-2'

require('../css/PollDetail.scss');

const PollBody = ({poll,userLoggedIn,onVoteClick,onWriteInSubmit,onTextChange}) => {
	
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
		<form onSubmit={(e) => { 
			e.preventDefault();
			return onWriteInSubmit(poll.link, poll);
		}} className="form-inline">
			<div className="form-group">
				<input type="text" className="form-control" value={poll.writeIn || ''} onChange={(e) => onTextChange('writeIn',e.target.value)} />
			</div>
			<button type="submit" className="btn btn-default">Write in vote</button>
		</form>
		<Bar {...dataAndOptions} />
	</section>

)};

export default PollBody;