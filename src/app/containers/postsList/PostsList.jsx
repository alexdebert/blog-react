/**
 * @overview Posts list page.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { fetchPosts } from '../../api/Posts'

import Post from '../../components/post/Post'

class PostsList extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		fetchPosts()
			.then(response => this.orderByDate(response.data))
			.catch(error => console.error(error.response));
	}

	orderByDate(posts) {
		var orderedPosts  = posts.sort((a,b) => new Date(b.publish_date) - new Date(a.publish_date))
		this.setState({posts: orderedPosts})
	}

	render(){
		const posts = this.state.posts
		return (
			<div className="row posts-list-container">
				{posts.map(post =>
					<Post key = {post.id}
						title = {post.title}
						author = {post.author}
						publishDate = {post.publish_date}
						description = {post.description}
						id= {post.id} />
				)}
			</div>
		)
	}
}

PostsList.propTypes = {
	posts: PropTypes.array
};

export default PostsList;