import React from 'react'

require('../css/EditPoll.scss');

const EditPoll = ({poll,displayMessage,update,onTextChange,onPollSubmit,onAddOptClick,onRemoveOptClick}) => {
	
	let pollName = poll.title,
		headerText = update ? 'Editing this poll' : 'Create new poll',
		deleteBtnClass = 'btn btn-default' + (poll.options.length < 3 ? ' disabled' : ''),
		messageClass = displayMessage.class + ' alert',
		titleClass = displayMessage.title + ' form-group',
		optClass = displayMessage.options + ' form-group';
	
	return (
	
	<main>
		<h2>{headerText}</h2>
		<form onSubmit={(e) => { 
			e.preventDefault();
			return onPollSubmit(poll.link, poll);
		}}>
			<div className={titleClass}>
				<label className="control-label">Poll Title:</label>
				<input type="text" className="form-control" value={poll.title} onChange={(e) => onTextChange('title',e.target.value)} disabled={update} />
			</div>
			<div className="form-group">
				<label className="control-label">Poll description:</label>
				<input type="text" className="form-control" value={poll.desc} onChange={(e) => onTextChange('desc',e.target.value)} />
			</div>
			<div className={optClass}>
				<label className="control-label">Options:</label>
				{
					poll.options.map((val,ind) => (
						<p key={ind}>
							<input type="text" className="form-control" value={val} onChange={(e) => onTextChange('options',e.target.value,ind)} />
						</p>
					))
				}
			</div>
			<div className="btn-toolbar">
				<a type="button" className="btn btn-default" onClick={() => onAddOptClick()}>Add Option</a>
				<button type="button" className={deleteBtnClass} onClick={() => onRemoveOptClick(poll.options.length)}>Remove Option</button>
				<button type="submit" className="btn btn-default">{update ? 'Edit Poll' : 'Add Poll'}</button>
			</div>
		</form>
		<div className={messageClass}>
			<p>{displayMessage.message}</p>
		</div>
	</main>

)};

export default EditPoll;