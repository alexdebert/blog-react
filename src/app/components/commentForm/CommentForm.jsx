/**
 * @overview Comment Form component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<label>
				User:
				<input name="user" value={props.user} type="text" onChange={props.handleChange} />
			</label>
			<textarea name="content" value={props.content} onChange={props.handleChange} />
			<input type="submit" value="Add comment" />
			<button onClick={props.handleClearForm}>Clear comment</button>
		</form>
	);

}


CommentForm.propTypes = {
	user: PropTypes.string,
	content: PropTypes.string,
	handleClearForm: PropTypes.func,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default CommentForm;