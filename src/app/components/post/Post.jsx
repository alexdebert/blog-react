/**
 * @overview Post component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Post = props => {
	return (
		<div>
			<p>{props.title}</p>
			<p>{props.author}</p>
			<p>{props.publishDate}</p>
			<p>{props.description}</p>
			<Link to={`/post-detail-${props.id}`} value='Test'>View Post</Link>
		</div>
	);

}


Post.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	author: PropTypes.string,
	publishDate: PropTypes.string,
	description: PropTypes.string
};

export default Post;