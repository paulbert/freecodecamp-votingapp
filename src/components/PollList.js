import React from 'react'
import { Link } from 'react-router'

require('../css/PollList.scss');

const PollList = ({polls,userId,onDeleteClick}) => {
	
	const UserOptionsBtnGroup = ({pollLink}) => (
		<div className="btn-group">
			<Link to={'/editPoll/' + pollLink} className="btn btn-default">Edit</Link>
			<button className="btn btn-danger" onClick={() => onDeleteClick(pollLink)}>Delete</button>
		</div>	
	);
	
	return (
	
	<section>
		<table className="list-group width-100pct">
			<tbody>
			{polls.map((poll,ind,arr) => {
				let thisClass = 'list-group-item';
				thisClass += ind === 0 ? ' list-group-item-first' : ind === arr.length - 1 ? ' list-group-item-last' : '';
				return (
					<tr key={ind} className="list-group-item-contain">
						<td className="col-md-8">
							<Link className={thisClass} to={'/poll/' + poll.link}>{poll.title}</Link>
						</td>
						<td className="col-md-4">
							{ poll.userId === userId ? <UserOptionsBtnGroup pollLink={poll.link} /> : ''}
						</td>
					</tr>
				);
			})}
			</tbody>
		</table>
	</section>

)};

export default PollList;