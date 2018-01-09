/**
 * @overview Post component.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Post = props => {
	return (
		<div key={props.id}>
			<p>{props.title}</p>
			<p>{props.author}</p>
			<p>{props.publish_date}</p>
		</div>
	);

}


Post.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	author: PropTypes.string,
	publish_date: PropTypes.string
};

export default Post;