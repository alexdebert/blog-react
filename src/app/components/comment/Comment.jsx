/**
 * @overview Comment component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => {
	return (
		<div className="card">
			<div className="card-body">
				<blockquote className="blockquote mb-0">
					{props.content}
					<footer className="blockquote-footer">{props.user} <cite title="Source Title">{props.date}</cite></footer>
				</blockquote>
			</div>
		</div>
	);

}


Comment.propTypes = {
	user: PropTypes.string,
	content: PropTypes.string,
	date: PropTypes.string,
};

export default Comment;