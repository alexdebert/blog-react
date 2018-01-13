/**
 * @overview Comment component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => {
	return (
		<div>
			<p>{props.user}</p>
			<p>{props.content}</p>
			<p>{props.parentId}</p>
			<p>{props.date}</p>
		</div>
	);

}


Comment.propTypes = {
	user: PropTypes.string,
	content: PropTypes.string,
	parentId: PropTypes.number,
	date: PropTypes.string,
};

export default Comment;