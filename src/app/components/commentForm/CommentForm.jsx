/**
 * @overview Comment Form component.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CommentForm extends Component {
	constructor(props) {
		super(props);		
		this.state = {
			//generate a unique ID number
			id: new Date().getTime(),
			postId: props.postId,
			parent_id: null,
			user: '',
			date: new Date(),
			content: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		const url = `http://localhost:9001/posts/${this.state.postId}/comments`
		
		event.preventDefault();
		
		this.setState({
			id: new Date().getTime(),
			date: new Date()
		});

		axios.post(url, this.state)
			.then(() => {
				console.log('Saved successfully')
				this.handleClearForm(event);
			})
			.catch(error => console.error(error.response));
	}

	handleClearForm(event) {
		event.preventDefault();
		this.setState({
			user: '',
			content: ''
		})
	}

	render(){
		const comment = this.state
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					User:
					<input name="user" value={comment.user} type="text" onChange={this.handleChange} />
				</label>
				<textarea name="content" value={comment.content} onChange={this.handleChange} />
				<input type="submit" value="Add comment" />
				<button onClick={this.handleClearForm}>Clear comment</button>
			</form>
		)
	}
}

CommentForm.propTypes = {
	postId: PropTypes.number
};

export default CommentForm;