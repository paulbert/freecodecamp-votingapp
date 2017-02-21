import React from 'react'
import MenuContain from '../containers/MenuContain'

const App = ({children}) => (
	
	<div className="container">
		<MenuContain />
		<div className="col-md-8">
			{children}
		</div>
	</div>
);

export default App;