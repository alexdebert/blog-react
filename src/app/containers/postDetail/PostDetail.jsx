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
		this.getPostDetail()
	}

	getPostDetail() {
		const url = `http://localhost:9001/posts/${this.state.post.id}`
		axios.all([
			axios.get(url),
			axios.get(url+`/comments`)
		])
			.then(axios.spread((postResp, commentResp) => {
				this.setState({post:postResp.data, comments:commentResp.data})
			}))
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
		const url = `http://localhost:9001/posts/${this.state.post.id}/comments`

		this.setState({
			comment: {
				...this.state.comment,
				id: this.getCommentId(),
				date: new Date()
			}
		});

		axios.post(url, this.state.comment)
			.then(() => {
				console.log('Saved successfully')
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