import React from 'react'

const EditPoll = (poll,onTextChange,onPollSubmit) => (
	
	<form onSubmit={(e) => { e.preventDefault(); return onPollSubmit(poll.link || 'new', poll);}}>
		<div className="form-group">
			<label className="control-label">Poll Title:</label>
			<input type="text" className="form-control" defaultValue={poll.title} onChange={(e) => onTextChange(e.target.value,'title')} />
		</div>
		<div className="form-group">
			<label className="control-label">Poll description:</label>
			<input type="text" className="form-control" defaultValue={poll.desc} onChange={(e) => onTextChange(e.target.value,'desc')} />
		</div>
		<div className="form-group">
			<label className="control-label">Options:</label>
			{
				poll.options.map((val,ind) => (
					<input type="text" className="form-control" defaultValue={val} onChange={(e) => onTextChange(e.target.value,'options',ind)} />
				)
			}
		</div>
		<button type="submit" className="btn btn-default">Login</button>
	</form>

);

export default EditPoll;