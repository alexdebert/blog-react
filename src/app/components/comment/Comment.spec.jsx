/**
 * @overview Comment test.
 */
import React from 'react';
import ReactDOM     from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Comment from './Comment';

describe("Comment component", () => {
	let component, props;

	beforeEach(() => {
		props = {
			user: 'User',
			content:'Here is the content of the comment',
			parentId: 2,
			date: '2018-01-14'
		}

		component = ReactTestUtils.renderIntoDocument(
			<div>
				<Comment {...props}/>
			</div>
		)
	});

	it('should be defined', ()=>{
		expect(component).toBeDefined();
	});

	it('displays comment props', ()=>{
		expect(component.textContent).toContain("User");
		expect(component.textContent).toContain("Here is the content of the comment");
		expect(component.textContent).toContain(2);
		expect(component.textContent).toContain("2018-01-14");
	});
})