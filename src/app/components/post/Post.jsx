/**
 * @overview Post component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Post = props => {
	return (
		<div className="col-sm-4">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p>{props.description}</p>
					<Link to={`/post-detail-${props.id}`} className="card-link">View Post</Link>
					<div className="card-footer">
						<small className="text-muted">By {props.author} on {props.publishDate}</small>
					</div>
				</div>
			</div>
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