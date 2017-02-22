import React from 'react'

const EditPoll = ({poll,update,onTextChange,onPollSubmit,onAddOptClick}) => {
	
	let pollName = poll.title;
	
	return (
	
	<main>
		<h2>Create new poll</h2>
		<form onSubmit={(e) => { 
			e.preventDefault();
			return onPollSubmit(poll.link, poll);
		}}>
			<div className="form-group">
				<label className="control-label">Poll Title:</label>
				<input type="text" className="form-control" value={poll.title} onChange={(e) => onTextChange('title',e.target.value)} required disabled={update} />
			</div>
			<div className="form-group">
				<label className="control-label">Poll description:</label>
				<input type="text" className="form-control" value={poll.desc} onChange={(e) => onTextChange('desc',e.target.value)} required />
			</div>
			<div className="form-group">
				<label className="control-label">Options:</label>
				{
					poll.options.map((val,ind) => (
						<input key={ind} type="text" className="form-control" value={val} onChange={(e) => onTextChange('options',e.target.value,ind)} />
					))
				}
			</div>
			<button type="button" className="btn btn-default" onClick={() => onAddOptClick()}>Add Option</button>
			<button type="submit" className="btn btn-default">Add Poll</button>
		</form>
	</main>

)};

export default EditPoll;