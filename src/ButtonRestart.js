import React from 'react';

import './ButtonRestart.css';

const ButtonRestart = ({ onClick }) => (
    <div className='restart'>
		<button onClick={() => onClick()}>
	        Restart
	    </button>
    </div>
)

export default ButtonRestart;