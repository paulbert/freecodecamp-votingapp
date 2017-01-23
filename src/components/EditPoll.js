import React from 'react'

const EditPoll = ({poll,onTextChange,onPollSubmit,onAddOptClick}) => (
	
	<form onSubmit={(e) => { e.preventDefault(); return onPollSubmit(poll.link, poll);}}>
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
				))
			}
		</div>
		<button type="button" className="btn btn-default" onClick={onAddOptClick()}>Add Option</button>
		<button type="submit" className="btn btn-default">Login</button>
	</form>

);

export default EditPoll;