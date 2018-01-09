/**
 * @overview Posts list page.
 */
import React, {Component} from 'react';

class PostsList extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
        //TODO
    }

	render(){
		return (
			<div className="posts-list-container">
				<p className="display-4">Here will be displayed the list of posts.</p>
			</div>
		)
	}
}

export default PostsList;