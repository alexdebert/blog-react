/**
 * @overview Post component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Post = props => {
	return (
		<div>
			<p>{props.title}</p>
			<p>{props.author}</p>
			<p>{props.publishDate}</p>
		</div>
	);

}


Post.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	author: PropTypes.string,
	publishDate: PropTypes.string
};

export default Post;