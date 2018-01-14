/**
 * @overview Post Detail page.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { fetchPostDetail, postComment } from '../../api/postDetail'

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
			comments: [],
			comment: {
				id: 0,
				postId: props.params.id,
				parent_id: null,
				user: '',
				date: new Date(),
				content: ''
			}
		}

		this.handleClearForm = this.handleClearForm.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.getCommentId = this.getCommentId.bind(this)
	}

	componentDidMount() {
		fetchPostDetail(this.state.post.id)
			.then(response => this.setState({post:response.post, comments:response.comments}))
			.catch(error => console.error(error.response));
	}

	handleClearForm (event) {
		event.persist();
		this.setState({
			comment: {
				user: '',
				content: ''
			}
		})
	}

	handleSubmit (event) {
		const comment = this.state.comment
		const id = this.state.post.id

		this.setState({
			comment: {
				...comment,
				id: this.getCommentId(),
				date: new Date()
			}
		});

		postComment(id, comment)
			.then(() => {
				this.handleClearForm(event)
			})
			.catch(error => console.error(error.response));
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			comment: {
				...this.state.comment,
				[name]: value
			}
		});
	}

	getCommentId () {
		let id = 0
		const comments = this.state.comments

		if(comments.length > 0) {
			const lastComment = comments[comments.length-1]
			let currentId = lastComment.id

			id = ++currentId
		}

		this.setState({
			comment: {
				id: id
			}
		})
	}

	render(){
		const post = this.state.post
		const comments = this.state.comments
		const comment = this.state.comment
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
				<CommentForm user = {comment.user}
					content = {comment.content}
					handleClearForm = {this.handleClearForm}
					handleChange = {this.handleChange}
					handleSubmit = {this.handleSubmit} />
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