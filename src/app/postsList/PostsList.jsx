/**
 * @overview Posts list page.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Post from '../post/Post';

class PostsList extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		/*fetch('http://localhost:9001/posts')
			.then(response => response.json())
			.then(({results: posts}) => this.setState({posts}))*/
	}

	render(){
		return (
			<div className="posts-list-container">
				//{posts.map(post => <Post {...post} />)}
			</div>
		)
	}
}

PostsList.propTypes = {
	posts: PropTypes.array
};

export default PostsList;