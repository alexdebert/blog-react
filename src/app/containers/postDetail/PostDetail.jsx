/**
 * @overview Post Detail page.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PostDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {
				id: props.params.id,
				title: '',
				author:'',
				publish_date: '',
				slug: '',
				description: '',
				content:''

			},
			comment: {
				id: 0,
				postId: 0,
				parent_id: null,
				user: '',
				date: '',
				content: ''
			}
		}
	}

	componentDidMount() {
		const url = `http://localhost:9001/posts/${this.state.post.id}`
		const fetchPost = fetch(url).then(response => response.json())
		const fetchComments = fetch(url+`/comments`).then(response => response.json())

		Promise.all([fetchPost, fetchComments])
			.then(result => this.setState({ post: result[0], comment: result[1]}))
	}

	render(){
		const post = this.state.post
		const __html = post.content
		return (
			<div className="post-detail-container">
				<p>{post.title}</p>
				<p>{post.author}</p>
				<p>{post.publish_date}</p>
				<p>{post.slug}</p>
				<p>{post.description}</p>
				<p dangerouslySetInnerHTML={{ __html }}></p>
			</div>
		)
	}
}

PostDetail.propTypes = {
	params: PropTypes.object
};

export default PostDetail;