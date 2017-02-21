import React from 'react'
import { Link } from 'react-router'
import FBLogin from './FBLogin'

const App = ({children}) => (
	
	<div className="container">
		<div className="col-md-4">
			<nav id="main-nav">
				<h1>Vote on stuff</h1>
				<ul className="nav nav-stacked">
					<li><Link to="/">Vote on something</Link></li>
					<li><Link to="/editPoll">Create New Poll</Link></li>
					<FBLogin />
				</ul>
			</nav>
		</div>
		<div className="col-md-8">
			{children}
		</div>
	</div>
);

export default App;