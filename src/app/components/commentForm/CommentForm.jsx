/**
 * @overview Comment Form component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = props => {
	return (
		<div className="bd-example">
			<form onSubmit={props.handleSubmit}>
				<div className="form-group">
					<label>User:</label>
					<input name="user" className="form-control" value={props.user} type="text" onChange={props.handleChange} />
				</div>
				<div className="form-group">
					<label>Comment:</label>
					<textarea name="content" className="form-control" value={props.content} onChange={props.handleChange} />
				</div>
				<div className="btn-group mr-2" role="group">
					<input className="btn btn-secondary" type="submit" value="Add comment" />
				</div>
				<button className="btn btn-secondary" onClick={props.handleClearForm}>Clear comment</button>
			</form>
		</div>
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

