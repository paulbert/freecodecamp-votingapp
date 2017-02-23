import React from 'react'
import PollListContain from '../containers/PollListContain'

const Home = ({location}) => {
	return (
	
	<main>
		<h2>{location.pathname === '/' ? 'What would you like to vote on?' : 'Your polls'}</h2>
		<PollListContain location={location} />
	</main>

)};

export default Home;