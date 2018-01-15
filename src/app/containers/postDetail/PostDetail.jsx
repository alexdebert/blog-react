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
				description: '',
				content:''

			},
			comments: [],
			comment: {
				id: 0,
				postId: props.params.id,
				parent_id: null,
				user: '',
				date: this.getDate(),
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
			.then(response => this.setState({post:response.post, comments: this.orderByDate(response.comments)}))
			.catch(error => console.error(error.response));
	}

	getDate() {
		let now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth() + 1,
			day = now.getDate();

		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		return year + '-' + month + '-' + day;
	}

	orderByDate(comments) {
		return comments.sort((a,b) => new Date(b.date) - new Date(a.date))
	}

	handleClearForm (event) {
		event.preventDefault()
		this.setState({
			comment: {
				user: '',
				content: ''
			}
		})
	}

	handleSubmit (event) {
		event.persist()
		const comment = this.state.comment
		const id = this.state.post.id

		this.setState({
			comment: {
				...comment,
				id: this.getCommentId(),
				date: this.getDate()
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
				<div className="card border-dark mb-3">
					<div className="card-header">{post.title}</div>
					<div className="card-body text-dark">
						<h5>Published by {post.author} on {post.publish_date}</h5>
						<p className="card-text">{post.description}</p>
						<p className="card-text"dangerouslySetInnerHTML={{ __html }}></p>
					</div>
				</div>
				<div className="form-container">
					<CommentForm user = {comment.user}
						content = {comment.content}
						handleClearForm = {this.handleClearForm}
						handleChange = {this.handleChange}
						handleSubmit = {this.handleSubmit} />
				</div>
				<div className="comments-container">
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