import React from 'react';
import { Link } from 'react-router'
import FBLogin from './FBLogin'

require('../css/Menu.scss');

const AnonMenu = () => (
	<ul className="nav nav-stacked">
		<li><Link to="/">Vote on something</Link></li>
		<FBLogin />
	</ul>
)

const LoggedInMenu = ({user}) => {
	return(
	<ul className="nav nav-stacked">
		<li><Link to="/">Vote on something</Link></li>
		<li><Link to="/editPoll">Create new poll</Link></li>
		<li><Link to="/myPolls">My polls</Link></li>
		<li><span className="nav-span">Hi! Logged in as {user.firstName} <a href="/logout">( log out )</a></span></li>
	</ul>
)}

const Menu = ({user}) => {
	return ( 
	<div className="col-md-4">
		<nav id="main-nav">
			<h1>Vote on stuff</h1>
			{ user.empty ? <AnonMenu /> : <LoggedInMenu user={user} /> }
		</nav>
	</div>
)}

export default Menu;