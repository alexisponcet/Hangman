import React from 'react';

const Rules = () => (
	<div className="rules">
		<p>Be the quickest to find the mystery word !</p>
		<ul className='list-group'>
			<li className="list-group-item d-flex justify-content-between align-items-center">Right Letter
				<span className="badge badge-primary badge-pill">+2</span>
			</li>
			<li className="list-group-item d-flex justify-content-between align-items-center">Wrong Letter
				<span className="badge badge-primary badge-pill">-1</span>
			</li>
			<li className="list-group-item d-flex justify-content-between align-items-center">Already tried
				<span className="badge badge-primary badge-pill">-2</span>
			</li>
		</ul>
	</div>
)

export default Rules;