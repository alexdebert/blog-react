/**
 * @overview Application entry point.
 */

// Global application styles
import 'src/app.scss';

// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// Our app
import App from './app/App';
import About from './app/containers/about';
import PostsList from './app/containers/postsList';
import PostDetail from './app/containers/postDetail';

render((
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={PostsList}/>
			<Route path='about' component={About}/>
			<Route path='posts' component={PostsList}/>
			<Route path='post-detail-:id' component={PostDetail}/>
			<Redirect from='*' to='/posts'/>
		</Route>
	</Router>
), document.getElementById('root'));
