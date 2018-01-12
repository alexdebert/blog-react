/**
 * @overview Post Detail page.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import CommentForm from '../../components/commentForm/CommentForm'
import Comment from '../../components/comment/Comment';

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
			comment: [{
				id: 0,
				postId: 0,
				parent_id: null,
				user: '',
				date: '',
				content: ''
			}]
		}
	}

	componentDidMount() {
		this.getPostDetail()
	}

	getPostDetail() {
		const url = `http://localhost:9001/posts/${this.state.post.id}`
		axios.all([
			axios.get(url),
			axios.get(url+`/comments`)
		])
			.then(axios.spread((postResp, commentResp) => {
				this.setState({post:postResp.data, comment:commentResp.data})
				console.log(this.state)
			}))
			.catch(error => console.error(error.response));
	}

	render(){
		const post = this.state.post
		const comments = this.state.comment
		const __html = post.content

		if(!comments) {
			return null;
		}

		return (
			<div className="post-detail-container">
				<p>{post.title}</p>
				<p>{post.author}</p>
				<p>{post.publish_date}</p>
				<p>{post.slug}</p>
				<p>{post.description}</p>
				<p dangerouslySetInnerHTML={{ __html }}></p>
				<CommentForm postId = {post.id}/>
				<div className="pcomments-container">
					{comments.map(comment =>
						<Comment key = {comment.id}
							user = {comment.user}
							parentId = {comment.parent_id}
							date = {comment.date}
							content = {comment.content} />
					)}
				</div>
			</div>
		)
	}
}

PostDetail.propTypes = {
	params: PropTypes.object
};

export default PostDetail;