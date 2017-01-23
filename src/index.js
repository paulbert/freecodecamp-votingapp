import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import votingApp from './reducers/votingApp'
import App from './components/App'
import Home from './components/Home'
import EditPollBody from './components/EditPollBody'
import PollBody from './components/PollBody'
import thunkMiddleware from 'redux-thunk'
import { Route,Router,browserHistory,IndexRoute } from 'react-router'

let store = createStore(votingApp,applyMiddleware(thunkMiddleware));

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/editPoll" component={EditPollBody} />
				<Route path="/poll/:pollId" component={PollBody} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
