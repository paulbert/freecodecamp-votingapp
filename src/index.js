import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import votingApp from './reducers/votingApp'
import App from './components/App'
import Home from './components/Home'
import EditPollContain from './containers/EditPollContain'
import PollDetailContain from './containers/PollDetailContain'
import thunkMiddleware from 'redux-thunk'
import { Route,Router,browserHistory,IndexRoute } from 'react-router'

let store = createStore(votingApp,applyMiddleware(thunkMiddleware));

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/editPoll(/:pollLink)" component={EditPollContain} />
				<Route path="/poll/:pollLink" component={PollDetailContain} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
